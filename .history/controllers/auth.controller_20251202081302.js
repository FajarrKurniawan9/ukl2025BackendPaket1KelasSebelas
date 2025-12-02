import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { name, password, role, email } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: { name },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
