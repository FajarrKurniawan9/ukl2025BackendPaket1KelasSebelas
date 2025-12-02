import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllOrder = async (req, res) => {
  try {
    const transactions = await prisma.order_list.findMany({});
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
  const { customer_name, order_type, order_date, items } = req.body;
  try {
    const newOrder = await prisma.order_list.create({
      data: {
        customer_name,
        order_type,
        order_date,
        orderDetails: {
          create: items.map((item) => ({
            coffee_id: item.coffee_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderDetails: include: { coffee_Id: true } })
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
    const existingTransaction = await prisma.order_list.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const deletedTransaction = await prisma.order_list.delete({
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
  const { customer_name, order_type } = req.body;
  try {
    const existingTransaction = await prisma.order_list.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const updatedTransaction = await prisma.order_list.update({
      where: { id: parseInt(id) },
      data: {
        customer_name: customer_name || existingTransaction.customer_name,
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

// export const getCoffeeAnalysis = async (req, res) => {
//   const { StartorderDate, endOrderDate } = req.body;

//   const coffeeAnalysis = await prisma.transactions.findMany({
//     where: {
//       createdAt: {
//         gte: new Date(StartorderDate),
//         lt: new Date(endOrderDate),
//       },
//     },
//   });
//   const coffeecount = {};

//   try {
//   } catch (error) {}
// };
