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

export const Item = async (req, res) => {
    const { name, category } = req.body;
    try {
        
    } catch (error) {
        
    }
}