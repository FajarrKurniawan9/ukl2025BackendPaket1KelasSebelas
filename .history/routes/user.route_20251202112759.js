import express from "express";
import {
  deleteUsers,
  getAllUsers,
  putUpdateUsers,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/user-validation.js";
im

const router = express.Router();

router.get("/users", getAllUsers);
router.put("/users/:id", putUpdateUsers);
router.delete("/users/:id", deleteUsers);
export default router;
