import express from 'express';
import ProductController from '../controllers/product.controller.js';
import upload from "../helpers/multer.js";
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const productRouter = express.Router();

// stats
productRouter.get('/stats', ProductController.stats);     // Get single product

//store
productRouter.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 7 },
]), authenticate, isAdmin,  ProductController.store);


productRouter.get('/', ProductController.index);       // List all products
productRouter.get('/:id', ProductController.show);     // Get single product


productRouter.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 7 },
]), authenticate, isAdmin ,ProductController.update);


productRouter.delete('/:id', authenticate, isAdmin, ProductController.destroy); // Delete product


export default productRouter;
