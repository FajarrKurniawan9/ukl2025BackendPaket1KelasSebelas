import { Prisma } from "@prisma/client";

const prisma = new Prisma.PrismaClient();

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await prisma.menu.findMany();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }