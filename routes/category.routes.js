import express from 'express';
import CategoryController from '../controllers/category.controller.js';


const categoryRouter = express.Router();

categoryRouter.post('/', CategoryController.store);
categoryRouter.get('/', CategoryController.index);
categoryRouter.get('/:id', CategoryController.show);
categoryRouter.put('/:id', CategoryController.update);
categoryRouter.delete('/:id', CategoryController.destroy); // use 'destroy' to avoid 'delete' conflict

export default categoryRouter;