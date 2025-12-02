import express from "express";
import {
  deleteCoffeeMenu,
  getAllCoffeeMenu,
  postNewCoffeeMenu,
  putUpdateCoffeeMenu,
} from "../controllers/coffee.controller.js";
import {
  isAdmin,
  isCashierOrAdminOrUser,
} from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/coffee", authorize, isCashierOrAdminOrUser, getAllCoffeeMenu);
router.post("/coffee", authorize, isAdmin, postNewCoffeeMenu);
router.put("/coffee/:id", authorize, isAdmin, putUpdateCoffeeMenu);
router.delete("/coffee/:id", authorize, isAdmin, deleteCoffeeMenu);
export default router;
