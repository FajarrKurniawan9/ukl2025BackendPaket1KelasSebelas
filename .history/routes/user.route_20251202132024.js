import express from "express";
import {
  deleteUsers,
  getAllUsers,
  putUpdateUsers,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", authorize, isAdmin, getAllUsers);
router.put("/cashier/:id", authorize, isAdmin, putUpdateUsers);
router.delete("/:id", authorize, isAdmin, deleteUsers);
export default router;
