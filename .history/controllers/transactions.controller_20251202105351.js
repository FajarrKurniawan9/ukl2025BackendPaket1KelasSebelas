import { Prisma } from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export const getAllOrder = async (req, res) => {
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
  const { constumer_name, order_type } = req.body;
  try {
    const newOrder = await prisma.transactions.create({
      data: {
        id: id,
        constumer_name,
        order_type,
        constumer_name,
      },
    });
    res
      .status(201)
      .json({ message: "New Order created successfully", data: newOrder });
  } catch (error) {
    error.message;
  }
};

export const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTransaction = await prisma.transactions.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const deletedTransaction = await prisma.transactions.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    error.message;
  }
};

export const putUpdateOrders = async (req, res) => {
  const { id } = req.params;
  const { constumer_name, order_type } = req.body;
  try {
    const existingTransaction = await prisma.transactions.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const updatedTransaction = await prisma.transactions.update({
      where: { id: parseInt(id) },
      data: {
        constumer_name: constumer_name || existingTransaction.constumer_name,
        order_type: order_type || existingTransaction.order_type,
      },
    });
    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    error.message;
  }
};

export const getCoffeeAnalysis = async (req, res) => {
  const { StartorderDate, endOrderDate } = req.body;

  const coffeeAnalysis = await prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(StartorderDate),
        lt: new Date(endOrderDate),
      },
    },
  });
  const coffeecou
  try {
  } catch (error) {}
};
