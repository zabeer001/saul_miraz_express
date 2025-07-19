import express from 'express';
import OrderController from '../controllers/order.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from "../helpers/multer.js";

const orderRouter = express.Router();


orderRouter.get('/stats', authenticate, isAdmin, OrderController.orderStats);

orderRouter.get('/best-selling-products' , OrderController.bestSellingProducts);


orderRouter.post('/', upload.none(), authenticate, OrderController.store);
orderRouter.get('/', authenticate, OrderController.index);
orderRouter.get('/:id',  OrderController.show);
orderRouter.put('/:id', upload.none(), authenticate, isAdmin, OrderController.update);
orderRouter.delete('/:id', authenticate, isAdmin, OrderController.destroy);



export default orderRouter;
