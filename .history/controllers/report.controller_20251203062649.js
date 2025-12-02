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
    }) 

    const coffeeStats = await prisma.coffee.groupBy({
        by: ["coffee_id"],
        _sum: {
            quantity: true,
        },
        orderBy: {
            _sum: {
                quantity: "desc",}}
    })
  } catch (error) {}
};
