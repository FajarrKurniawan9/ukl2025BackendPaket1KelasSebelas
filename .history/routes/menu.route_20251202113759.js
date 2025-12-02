import express from "express";
import {
  deleteCoffeeMenu,
  getAllCoffeeMenu,
  postNewCoffeeMenu,
  putUpdateCoffeeMenu,
} from "../controllers/menu.controller.js";
import { isAdmin, isCashierOrAdminOrUser} from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/coffee", getAllCoffeeMenu);
router.post("/coffee", postNewCoffeeMenu);
router.put("/coffee/:id", putUpdateCoffeeMenu);
router.delete("/coffee/:id", deleteCoffeeMenu);
export default router;
