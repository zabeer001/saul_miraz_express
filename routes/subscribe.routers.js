import express from 'express';

import upload from '../helpers/multer.js';
import SubscriberController from '../controllers/SubscriberController.js';

const stripeRouter = express.Router();

stripeRouter.post('/email', upload.none(), SubscriberController.sendSubscriptionMail);

export default stripeRouter;
