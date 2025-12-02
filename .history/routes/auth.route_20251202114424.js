import express from "express";
import { login, authorize, register } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register(req, res));
router.post("/login", log);
export default router;
