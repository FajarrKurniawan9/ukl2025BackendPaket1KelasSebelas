import express from "express";
import { getCoffeeSalesReport } from "../controllers/report.controller.js";
import {}

const router = express.Router();

router.get("/coffee-sales", getCoffeeSalesReport);

export default router;
