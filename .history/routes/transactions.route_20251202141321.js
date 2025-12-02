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
router.get("/orders", authorize, isCashierOrAdminOrUser, getAllOrder);
router.post("/orderCreate", authorize, isCashierOrAdminOrUser, postCreateOrder);
router.delete("/delete/:id", authorize, isCashierOrAdminOrUser(req, res, next), deleteOrders);
router.put("/update/:id", authorize, isCashierOrAdminOrUser, putUpdateOrders);
export default router;
