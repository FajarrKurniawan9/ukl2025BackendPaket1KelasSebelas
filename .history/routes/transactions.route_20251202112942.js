import express from "express";
import {
  getAllOrder,
  deleteOrders,
  postCreateOrder,
  putUpdateOrders,
} from "../controllers/transactions.controller.js";
import { isCashierOrAdminOrUser } from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/transactions",a getAllOrder);
router.post("/transactions", postCreateOrder);
router.delete("/transactions/:id", deleteOrders);
router.put("/transactions/:id", putUpdateOrders);
export default router;
