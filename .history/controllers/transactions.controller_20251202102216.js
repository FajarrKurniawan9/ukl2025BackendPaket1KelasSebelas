import { Prisma } from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactions.findMany({});
    res.status(200).json({
      message: "Transactions retrieved successfully",
      total: transactions.length,
      data: transactions,
    });
  } catch (error) {
    error.message;
  }
};

export const postCreateOrder = async (req, res) => {
    const {constumer_name, order_type} = 
}
