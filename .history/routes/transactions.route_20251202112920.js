import express from "express";
import {
  getAllOrder,
  deleteOrders,
  postCreateOrder,
  putUpdateOrders,
} from "../controllers/transactions.controller.js";
import { isCashierOrAdminOrUser, isAdmin } from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/transactions", au getAllOrder(req, res));
router.post("/transactions", postCreateOrder(req, res));
router.delete("/transactions/:id", deleteOrders(req, res));
router.put("/transactions/:id", putUpdateOrders(req, res));
export default router;
