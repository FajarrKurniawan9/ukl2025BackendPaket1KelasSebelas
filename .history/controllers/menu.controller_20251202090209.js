import { Prisma } from "@prisma/client";

const prisma = new Prisma.PrismaClient();

export const postNewCoffeeMenu = async (req, res) => {}

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
