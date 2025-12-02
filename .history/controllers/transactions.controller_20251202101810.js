import { Prisma } from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactions.findMany({});
    res
      .status(200)
      .json({
        message: "Transactions retrieved successfully",
        data: transactions,
      });
  } catch (error) {
    error.message;
  }
};
