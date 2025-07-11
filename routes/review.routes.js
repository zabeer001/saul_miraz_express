import express from 'express';
import ReviewController from '../controllers/review.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from '../helpers/multer.js';

const reviewRouter = express.Router();

reviewRouter.post('/', upload.none(), authenticate, ReviewController.store);       // users can post reviews
reviewRouter.get('/', ReviewController.index);                                      // public access
reviewRouter.get('/:id', ReviewController.show);                                    // single review show
reviewRouter.put('/:id', upload.none(), authenticate, ReviewController.update);     // user can update their review
reviewRouter.delete('/:id', authenticate, isAdmin, ReviewController.destroy);       // only admin can delete reviews

export default reviewRouter;
