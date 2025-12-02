import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import inventoryRoute from "./routes/inventory.route.js";
import borrowRoute from "./routes/borrow.route.js";
import menuRoute from "./routes/menu.route.js";
import transactionsRoute from "./routes/transactions.route.js";
import auth
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());