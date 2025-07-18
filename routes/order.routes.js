import express from 'express';

import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from '../helpers/multer.js';
import OrderController from '../controllers/order.controller.js';

const customerRouter = express.Router();

// Static routes FIRST
customerRouter.get('/', authenticate, isAdmin, OrderController.customers);




export default customerRouter;