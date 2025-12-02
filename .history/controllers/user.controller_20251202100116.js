import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    res.status(200).json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
