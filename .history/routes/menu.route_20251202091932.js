import express from "express";
import {
  deleteCoffeeMenu,
  getAllCoffeeMenu,
  postNewCoffeeMenu,
  putUpdateCoffeeMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/menu/coffee", getAllCoffeeMenu);
router.post("/menu/coffee", postNewCoffeeMenu);
router.put("/menu/coffee/:id", putUpdateCoffeeMenu);
router.delete("/menu/coffee/:id", deleteCoffeeMenu);