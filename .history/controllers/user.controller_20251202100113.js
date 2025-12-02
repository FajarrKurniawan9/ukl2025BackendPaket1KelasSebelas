import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
