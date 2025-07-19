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

generalRouter.post(
  '/password/reset-for-auth-user',
  authenticate,      // ensure user is logged in and req.authUser is set
  upload.none(),     // no files, only fields
  AuthController.resetPasswordAuthUser
);



export default generalRouter;