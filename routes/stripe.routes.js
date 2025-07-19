import express from 'express';

import upload from '../helpers/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { checkout, checkoutCancel, checkoutSuccess, checkPaymentStatus } from '../controllers/stripe.controller.js';

const stripeRouter = express.Router();

stripeRouter.post('/checkout', upload.none(), authenticate, checkout);
stripeRouter.get('/payment/success', checkoutSuccess);
stripeRouter.get('/cancel', checkoutCancel);
stripeRouter.post('/check-payment-status', authenticate, checkPaymentStatus);

export default stripeRouter;