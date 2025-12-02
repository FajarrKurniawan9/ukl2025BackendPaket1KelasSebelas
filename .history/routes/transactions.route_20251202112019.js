import express from 'express';
import { getAllTransactions, postNewTransaction } from '../controllers/transactions.controller.js';

const router = express.Router();