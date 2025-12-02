import { Prisma } from "@prisma/client";

const prisma = new Prisma.PrismaClient();

// export const getMenuItems = async (req, res) => {
//   try {
//     const menuItems = await prisma.menu.findMany();
//     res.status(200).json(menuItems);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const postOrderItem = async (req, res) => {
  const { name, orderType, quantity } = req.body;
  const userId = req.user.id;

  const coffeeMenu = await prisma.coffee.findUnique({
    where: { name },
  });

  if (!coffeeMenu) {
    return res.status(404).json({ message: "Menu item not found" });
  }

const sto
  try {
  } catch (error) {}
};
