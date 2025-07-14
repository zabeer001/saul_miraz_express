import express from 'express';
import StripeController from '../controllers/stripe.controller.js';
import upload from '../helpers/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';

const stripeRouter = express.Router();

stripeRouter.post('/checkout', upload.none() , authenticate, StripeController.checkout);
stripeRouter.get('/success',StripeController.checkoutSuccess);
stripeRouter.get('/cancel', StripeController.checkoutCancel);
stripeRouter.post('/check-payment-status', StripeController.checkPaymentStatus);

export default stripeRouter;
