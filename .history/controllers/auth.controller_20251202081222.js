
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { username, password, role, email } = req.body;
    try {} c

}
