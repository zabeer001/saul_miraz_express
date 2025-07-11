import express from 'express';
import ProductController from '../controllers/product.controller.js';
import upload from "../helpers/multer.js";

const productRouter = express.Router();


//store
productRouter.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 7 },
]),ProductController.store);


productRouter.get('/', ProductController.index);       // List all products
productRouter.get('/:id', ProductController.show);     // Get single product


productRouter.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 7 },
]),ProductController.update);


productRouter.delete('/:id', ProductController.destroy); // Delete product


export default productRouter;
