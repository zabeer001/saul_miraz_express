import { Router } from 'express';
import upload from '../helpers/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';
import AuthController from '../controllers/auth.controller.js';

const generalRouter = Router();

// Existing routes
generalRouter.post(
    '/change-profile-details',
    authenticate,                 // ensure the user is authenticated
    upload.single('image'),        // handle single image upload
    AuthController.changeProfileDetails
);




export default generalRouter;