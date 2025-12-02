import express from "express";
import {
  deleteUsers,
  getAllUsers,
  putUpdateUsers,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/users",authorize, isAdmin, getAllUsers);
router.put("/users/:id", putUpdateUsers);
router.delete("/users/:id", deleteUsers);
export default router;
