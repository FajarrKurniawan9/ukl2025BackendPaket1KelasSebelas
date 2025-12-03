import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Laporan Summary Penjualan + Cashier Performance
export const getCoffeeSalesReport = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await prisma.order_list.count();

    // Total Revenue
    const orderDetails = await prisma.order_detail.findMany({
      select: {
        price: true,
        quantity: true,
      },
    });

    const totalRevenue = orderDetails.reduce((sum, detail) => {
      return sum + detail.price * detail.quantity;
    }, 0);

    // Best Selling Coffee
    const coffeeStats = await prisma.order_detail.groupBy({
      by: ["coffee_id"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const bestSelling = await Promise.all(
      coffeeStats.map(async (stat) => {
        const coffee = await prisma.coffee.findUnique({
          where: { id: stat.coffee_id },
        });
        return {
          coffee_name: coffee?.name,
          total_sold: stat._sum.quantity,
        };
      })
    );

    // Cashier Performance Report
    const cashierStats = await prisma.order_detail.groupBy({
      by: ["user_id"],
      _sum: {
        quantity: true,
      },
      _count: {
        id: true,
      },
    });

    const cashierPerformance = await Promise.all(
      cashierStats.map(async (stat) => {
        const user = await prisma.users.findUnique({
          where: { id: stat.user_id },
          select: {
            id: true,
            name: true,
            role: true,
          },
        });

        // Calculate total revenue for this cashier
        const cashierOrders = await prisma.order_detail.findMany({
          where: { user_id: stat.user_id },
          select: {
            price: true,
            quantity: true,
          },
        });

        const cashierRevenue = cashierOrders.reduce((sum, detail) => {
          return sum + detail.price * detail.quantity;
        }, 0);

        // Count unique transactions (order_list) served by this cashier
        const uniqueOrders = await prisma.order_detail.findMany({
          where: { user_id: stat.user_id },
          distinct: ["order_id"],
          select: {
            order_id: true,
          },
        });

        return {
          cashier_id: user?.id,
          cashier_name: user?.name,
          cashier_role: user?.role,
          total_transactions: uniqueOrders.length,
          total_items_served: stat._sum.quantity,
          total_revenue: cashierRevenue,
        };
      })
    );

    // Sort by total revenue (descending)
    cashierPerformance.sort((a, b) => b.total_revenue - a.total_revenue);

    res.status(200).json({
      message: "Sales summary and cashier performance retrieved successfully",
      data: {
        sales_summary: {
          total_orders: totalOrders,
          total_revenue: totalRevenue,
          best_selling_products: bestSelling,
        },
        cashier_performance: cashierPerformance,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Laporan Transaksi Per Periode
export const getTransactionsByPeriod = async (req, res) => {
  const { start_date, end_date } = req.body;

  if (!start_date || !end_date) {
    return res.status(400).json({
      message: "start_date and end_date body parameters are required",
    });
  }

  try {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    endDate.setHours(23, 59, 59, 999); // Include full end date

    const transactions = await prisma.order_list.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        orderDetails: {
          include: {
            coffee_Id: true,
            user_Id: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate total for each transaction
    const transactionsWithTotal = transactions.map((transaction) => {
      const total = transaction.orderDetails.reduce((sum, detail) => {
        return sum + detail.price * detail.quantity;
      }, 0);

      return {
        id: transaction.id,
        customer_name: transaction.customer_name,
        order_type: transaction.order_type,
        order_date: transaction.order_date,
        created_at: transaction.createdAt,
        items: transaction.orderDetails.map((detail) => ({
          coffee_name: detail.coffee_Id.name,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.price * detail.quantity,
          served_by: detail.user_Id.name,
        })),
        total: total,
      };
    });

    // Calculate period summary
    const periodTotal = transactionsWithTotal.reduce(
      (sum, t) => sum + t.total,
      0
    );

    res.status(200).json({
      message: "Transactions by period retrieved successfully",
      period: {
        start_date: start_date,
        end_date: end_date,
      },
      summary: {
        total_transactions: transactions.length,
        total_revenue: periodTotal,
      },
      data: transactionsWithTotal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Laporan Detail per Customer
export const getCustomerOrders = async (req, res) => {
  const { customer_name } = req.query;

  if (!customer_name) {
    return res.status(400).json({
      message: "customer_name query parameter is required",
    });
  }

  try {
    const orders = await prisma.order_list.findMany({
      where: {
        customer_name: {
          contains: customer_name,
        },
      },
      include: {
        orderDetails: {
          include: {
            coffee_Id: true,
            user_Id: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found for this customer",
        customer: customer_name,
      });
    }

    // Find cashier who served the most items for this customer
    const cashierItemCount = {};

    orders.forEach((order) => {
      order.orderDetails.forEach((detail) => {
        const cashierId = detail.user_Id.id;
        const cashierName = detail.user_Id.name;

        if (!cashierItemCount[cashierId]) {
          cashierItemCount[cashierId] = {
            name: cashierName,
            items_served: 0,
          };
        }
        cashierItemCount[cashierId].items_served += detail.quantity;
      });
    });

    // Get cashier with most items served
    let mostActiveCashier = null;
    let maxItems = 0;

    Object.values(cashierItemCount).forEach((cashier) => {
      if (cashier.items_served > maxItems) {
        maxItems = cashier.items_served;
        mostActiveCashier = cashier.name;
      }
    });

    const ordersWithTotal = orders.map((order) => {
      const total = order.orderDetails.reduce((sum, detail) => {
        return sum + detail.price * detail.quantity;
      }, 0);

      return {
        id: order.id,
        customer_name: order.customer_name,
        order_type: order.order_type,
        order_date: order.order_date,
        created_at: order.createdAt,
        items: order.orderDetails.map((detail) => ({
          coffee_name: detail.coffee_Id.name,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.price * detail.quantity,
          served_by: detail.user_Id.name,
        })),
        total: total,
      };
    });

    res.status(200).json({
      message: "Customer orders retrieved successfully",
      customer: customer_name,
      most_active_cashier: mostActiveCashier,
      total_orders: orders.length,
      data: ordersWithTotal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
