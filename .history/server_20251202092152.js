import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import menuRoute from "./routes/menu.route.js";
import transactionsRoute from "./routes/transactions.route.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/auth", authRoute);
app.use("/menu", menuRoute);
app.use("/transactions", transactionsRoute);


