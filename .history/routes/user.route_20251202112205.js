import express from "express";
import {
  deleteUsers,
  getAllUsers,
  putUpdateUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router