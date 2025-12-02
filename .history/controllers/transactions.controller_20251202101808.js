import { Prisma } from "@prisma/client";
const prisma = new Prisma.PrismaClient();

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await prisma.transactions.findMany({});
    } catch (error) {
        error.message
    }
}