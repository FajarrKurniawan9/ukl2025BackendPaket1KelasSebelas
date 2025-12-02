import express from "express";
import {
  getAllOrder,
  deleteOrders,
  postCreateOrder,
  putUpdateOrders,
} from "../controllers/transactions.controller.js";
import {
  isCashierOrAdminOrUser,
  isAdmin,
} from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/transactions", authorize, isCashierOrAdminOrUser, getAllOrder);
router.post(
  "/",
  authorize,
  isCashierOrAdminOrUser,
  postCreateOrder
);
router.delete("/transactions/:id", authorize, isAdmin, deleteOrders);
router.put(
  "/transactions/:id",
  authorize,
  isCashierOrAdminOrUser,
  putUpdateOrders
);
export default router;
