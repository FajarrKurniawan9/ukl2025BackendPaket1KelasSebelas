import express from 'express';
import { getAllOrder, deleteOrders, postCreateOrder } from '../controllers/transactions.controller.js';

const router = express.Router(); 
router.get('/transactions', getAllTransactions);