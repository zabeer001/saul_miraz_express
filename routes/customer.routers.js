import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import OrderController from '../controllers/order.controller.js';

const customerRouter = express.Router();



// Admin-only routes
customerRouter.get('/', authenticate, isAdmin, OrderController.customers);

export default customerRouter;