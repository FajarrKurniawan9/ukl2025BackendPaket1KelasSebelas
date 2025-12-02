import { Prisma } from "@prisma/client";

const prisma = new Prisma.PrismaClient();

export const postNewCoffeeMenu = async (req, res) => {
  const { name, price, quantity, size } = req.body;

  const coffeeExists = await prisma.coffee.findUnique({
    where: { name },
  });
  if (coffeeExists) {
    return res.status(400).json({ message: "Coffee menu item already exists" });
  }

  const newCoffeeMenu = await prisma.coffee.create({
    data: {
      name: name,
      harga: price,
      jumlah: parseInt(quantity),
      ukuran: size,
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
  const { id } = req.params.id;
  const { name, price, quantity, size } = req.body;

  const coffeeItems = await prisma.coffee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!inventoryItem) {
    return res.status(404).json({ message: "Coffee menu item not found" });
  }
  const updatedCoffeeMenu = await prisma.coffee.update({
    where: { id: parseInt(id) },
    data: {
        name: name || coffeeItems.name,
        harga: price || coffeeItems.,
        jumlah: parseInt(quantity),
        ukuran: size,
    },
  });
    }
  try {
    
  } catch (error) {
    
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
