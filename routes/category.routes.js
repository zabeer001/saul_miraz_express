import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from "../helpers/multer.js";


const categoryRouter = express.Router();

categoryRouter.get('/by-type', CategoryController.indexByType);

categoryRouter.post('/', upload.none() ,authenticate , isAdmin , CategoryController.store);
categoryRouter.get('/', CategoryController.index);
categoryRouter.get('/:id', CategoryController.show);
categoryRouter.put('/:id', upload.none()  , authenticate , isAdmin , CategoryController.update);
categoryRouter.delete('/:id', authenticate , isAdmin , CategoryController.destroy); // use 'destroy' to avoid 'delete' conflict

export default categoryRouter;