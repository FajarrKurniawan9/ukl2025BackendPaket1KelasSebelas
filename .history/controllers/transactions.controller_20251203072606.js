import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllOrder = async (req, res) => {
  try {
    const transactions = await prisma.order_list.findMany({
      include: {
        orderDetails: {
          include: {
            coffee_Id: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Transactions retrieved successfully",
      total: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postCreateOrder = async (req, res) => {
  const { customer_name, order_type, order_date, items } = req.body;

  // Validation
  if (
    !customer_name ||
    !order_type ||
    !order_date ||
    !items ||
    items.length === 0
  ) {
    return res.status(400).json({
      message: "customer_name, order_type, order_date, and items are required",
    });
  }

  try {
    // Check if all coffee items exist and have enough stock
    for (const item of items) {
      const coffee = await prisma.coffee.findUnique({
        where: { id: item.coffee_id },
      });

      if (!coffee) {
        return res.status(404).json({
          message: `Coffee with id ${item.coffee_id} not found`,
        });
      }

      if (coffee.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${coffee.name}. Available: ${coffee.quantity}, Requested: ${item.quantity}`,
        });
      }
    }

    const calculateTotalPrice = async (item.coffee_id, item.quantity) => {
      const coffee = await prisma.coffee.findUnique({
        where: { id: item.coffee_id },
      });
      return coffee.price * quantity;
    };
    // Create order with details
    const newOrder = await prisma.order_list.create({
      data: {
        customer_name,
        order_type,
        order_date,
        orderDetails: {
          create: items.map((item) => ({
            coffee_id: item.coffee_id,
            quantity: item.quantity,
            price: calculateTotalPrice,
          })),
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

    // Update coffee stock
    for (const item of items) {
      await prisma.coffee.update({
        where: { id: item.coffee_id },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    res.status(201).json({
      message: "New Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTransaction = await prisma.order_list.findUnique({
      where: { id: parseInt(id) },
      include: { orderDetails: true },
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Delete order details first (because of foreign key)
    await prisma.order_detail.deleteMany({
      where: { order_id: parseInt(id) },
    });

    // Then delete the order
    const deletedTransaction = await prisma.order_list.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putUpdateOrders = async (req, res) => {
  const { id } = req.params;
  const { customer_name, order_type, order_date } = req.body;

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
        order_date: order_date || existingTransaction.order_date,
      },
    });

    res.status(200).json({
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
