import express from 'express';
import PromoCodeController from '../controllers/promoCode.controller.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from '../helpers/multer.js';

const promoCodeRouter = express.Router();

promoCodeRouter.get('/stats', PromoCodeController.stats);
promoCodeRouter.post('/', upload.none(), authenticate, isAdmin, PromoCodeController.store);
promoCodeRouter.get('/', PromoCodeController.index);
promoCodeRouter.get('/:id', PromoCodeController.show);
promoCodeRouter.put('/:id', upload.none(), authenticate, isAdmin, PromoCodeController.update);
promoCodeRouter.delete('/:id', authenticate, isAdmin, PromoCodeController.destroy);

export default promoCodeRouter;
