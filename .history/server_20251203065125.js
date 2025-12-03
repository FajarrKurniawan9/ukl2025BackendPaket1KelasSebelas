import express from "express";
import dotenv from "dotenv";
import menuRoute from "./routes/coffee.route.js";
import transactionsRoute from "./routes/transactions.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/auth", authRoute);
app.use("/menu", menuRoute);
app.use("/transactions", transactionsRoute);
app.use("/users", userRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
