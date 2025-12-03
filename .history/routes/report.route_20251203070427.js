import express from "express";
import {
  getCoffeeSalesReport,
  getCustomerOrders,
  getTransactionsByPeriod,
} from "../controllers/report.controller.js";
import { authorize } from "../controllers/auth.controller.js";
import { isAdmin, is } from "../middlewares/user-validation.js";
const router = express.Router();

router.get("/coffee-sales", authorize, isAdmin, getCoffeeSalesReport);
router.get(
  "/transactions-period",
  authorize, is)

export default router;
