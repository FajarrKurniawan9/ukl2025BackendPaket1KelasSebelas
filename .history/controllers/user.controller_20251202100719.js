import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({});
    res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putUpdateUsers = async (req, res) => {
  const { id } = req.params.id;
  const { name, password, role, email } = req.body;
  const existingUser = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  const updatedUser = await prisma.users.update({
    where: { id: parseInt(id) },
    data: {
      id: parseInt(id),
      name,
      password,
      role,
      email,
    },
  });
  try {
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const existingUser = await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  t
};
