import express from 'express';
import { getAllOrder,  } from '../controllers/transactions.controller.js';

const router = express.Router(); 
router.get('/transactions', getAllTransactions);