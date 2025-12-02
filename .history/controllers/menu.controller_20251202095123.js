import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postNewCoffeeMenu = async (req, res) => {
  const { name, price, quantity, size } = req.body;

  const newCoffeeMenu = await prisma.coffee.create({
    data: {
      name: name,
      price: price,
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
    res.status(500).json({ message: "Internal server error" });
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
      price: price || coffeeItems.price,
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
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getMenuItems = async (req, res) => {
//   try {
//     const menuItems = await prisma.menu.findMany();
//     res.status(200).json(menuItems);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const postOrderItem = async (req, res) => {
//   const { name, orderType, quantity } = req.body;
//   const userId = req.user.id;

//   const coffeeMenu = await prisma.coffee.findUnique({
//     where: { name },
//   });

//   if (!coffeeMenu) {
//     return res.status(404).json({ message: "Menu item not found" });
//   }

//   if (coffee.quantity < quantity) {
//     return res
//       .status(400)
//       .json({ message: "Insufficient stock for the requested item" });
//   }
//   try {
//     const orderItem = await prisma.order_detail.create({
//       data: {
//         userId,
//         orderType,
//         coffeeId: coffeeMenu.id,
//         jumlah: quantity,
//       },
//     });
//   } catch (error) {}
// };
