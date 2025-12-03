import { PrismaClient } from "@prisma/client";
import { SECRET_KEY } from "....controller";
import jwt from "jsonwebtoken";
import md5 from "md5";
const prisma = new PrismaClient();

// Laporan Summary Penjualan
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

    res.status(200).json({
      message: "Sales summary retrieved successfully",
      data: {
        total_orders: totalOrders,
        total_revenue: totalRevenue,
        best_selling_products: bestSelling,
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
          },
        },
      },
    });

    const verifyToken = async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res
            .status(401)
            .json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    const duty = await prisma.users.findMany({
      where: {
        password: {
          contains: verifyToken,
        },
      },
    });

    const ordersWithTotal = orders.map((order) => {
      const total = order.orderDetails.reduce((sum, detail) => {
        return sum + detail.price * detail.quantity;
      }, 0);

      return {
        ...order,
        total: total,
      };
    });

    res.status(200).json({
      message: "Customer orders retrieved successfully",
      customer: customer_name,
      total_orders: orders.length,
      data: ordersWithTotal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
