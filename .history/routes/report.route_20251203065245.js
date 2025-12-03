import express from "express";
import { getCoffeeSalesReport } from "../controllers/report.controller.js";
import { authorize } from "../controllers/auth.controller.js";
import {  } from "../middlewares/auth.co.js";
const router = express.Router();

router.get("/coffee-sales", getCoffeeSalesReport);

export default router;
