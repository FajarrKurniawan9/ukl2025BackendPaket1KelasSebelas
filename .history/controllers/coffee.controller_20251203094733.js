import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postNewCoffeeMenu = async (req, res) => {
  const { name, price, quantity, size } = req.body;

  const newCoffeeMenu = await prisma.coffee.create({
    data: {
      name: name,
      price: parseInt(price),
      quantity: parseInt(quantity),
      size: size,
      image: "",
    },
  });
  try {
    res.status(201).json({
      message: "New coffee menu item added successfully",
      data: newCoffeeMenu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putUpdateCoffeeMenu = async (req, res) => {
  const { name, price, quantity, size } = req.body;
  const { id } = req.params;

  const coffeeItems = await prisma.coffee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!coffeeItems) {
    return res.status(404).json({ message: "Coffee menu item not found" });
  }
  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than zero" });
  }
  const updatedCoffeeMenu = await prisma.coffee.update({
    where: { id: parseInt(id) },
    data: {
      id: Number(id),
      name: name || coffeeItems.name,
      price: parseInt(price) || coffeeItems.price,
      quantity: parseInt(quantity),
      size: size || coffeeItems.size,
      image: coffeeItems.image,
    },
  });
  try {
    res.status(200).json({
      message: "Coffee menu item updated successfully",
      data: updatedCoffeeMenu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCoffeeMenu = async (req, res) => {
  const { id } = req.params;
  const coffeeItems = await prisma.coffee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!coffeeItems) {
    return res.status(404).json({ message: "Coffee menu item not found" });
  }
  const deletedItems = await prisma.coffee.delete({
    where: { id: parseInt(id) },
  });
  try {
    res.status(200).json({
      message: "Coffee menu item deleted successfully",
      data: deletedItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCoffeeMenu = async (req, res) => {
  try {
    const coffeeMenu = await prisma.coffee.findMany({
      orderBy: { id: "asc" },
    });

    res.status(200).json({
      message: "Coffee menu retrieved successfully",
      total: coffeeMenu.length,
      data: coffeeMenu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};