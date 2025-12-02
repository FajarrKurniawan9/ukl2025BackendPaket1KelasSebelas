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
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = md5(password
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
