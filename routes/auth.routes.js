import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import upload from '../helpers/multer.js';
import { authenticate } from '../middleware/authMiddleware.js';

const authRouter = Router();

// Existing routes
authRouter.post('/login', upload.none(), AuthController.login);
authRouter.post('/register', upload.none(), AuthController.signUp);
authRouter.post('/logout', authenticate, AuthController.logout);
authRouter.get('/me', authenticate, AuthController.profile);
authRouter.post('/change-profile-deatils', authenticate, AuthController.profile);
authRouter.post('/google/jwt-process', AuthController.loginWithGoogle);



export default authRouter;