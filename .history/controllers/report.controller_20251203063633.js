import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCoffeeSalesReport = async (req, res) => {
  try {
    const totalOrdered = await prisma.order_list.counst();

    const orderDetails = await prisma.order_detail.findMany({
      include: {
        price: true,
        quantity: true,
      },
    });

    const totalRevenue = orderDetails.reduce((sum, detail) => {
      return sum + detail.price * detail.quantity;
    });

    const coffeeStats = await prisma.coffee.groupBy({
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

    res.status(200).json{(
        message: "Coffee sales report retrieved successfully",
        data": {
          total_orders: totalOrdered,
          total_revenue: totalRevenue,
          best_selling_coffees: bestSelling,
        },
    )}
  } catch (error) {}
};
