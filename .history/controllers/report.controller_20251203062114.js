import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCoffeeSalesReport = async (req, res) => {
  try {
    const totalOrdered = await prisma.order_list.counst();

    const orderDetails = await prisma
  } catch (error) {}
};
