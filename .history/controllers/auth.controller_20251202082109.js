import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "ukl1josjis";

export const register = async (req, res) => {
  const { name, password, role, email } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: { name },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = await prisma.users.create({
      data: {
        name,
        password: md5(password),
        role,
        email,
      },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { name },
    });
    if (!user || user.password !== md5(password)) {
      return res.status(401).json({ message: "Invalid password / Users" });
    }
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
    } catch (error) {
        
    }
}
