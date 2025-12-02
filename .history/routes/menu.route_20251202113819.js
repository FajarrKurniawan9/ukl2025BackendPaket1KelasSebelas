import express from "express";
import {
  deleteCoffeeMenu,
  getAllCoffeeMenu,
  postNewCoffeeMenu,
  putUpdateCoffeeMenu,
} from "../controllers/menu.controller.js";
import {
  isAdmin,
  isCashierOrAdminOrUser,
} from "../middlewares/user-validation.js";
import { authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/coffee",authorize, isCashierOrAdminOrUser, getAllCoffeeMenu);
router.post("/coffee",authorize, postNewCoffeeMenu);
router.put("/coffee/:id",authorize, putUpdateCoffeeMenu);
router.delete("/coffee/:id",authorize, deleteCoffeeMenu);
export default router;
