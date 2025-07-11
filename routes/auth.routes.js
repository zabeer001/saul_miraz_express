import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import upload from "../helpers/multer.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/login', upload.none() ,AuthController.login);

authRouter.post('/sign-up', upload.none(), AuthController.signUp);

authRouter.post('/logout', authenticate , AuthController.logout);

authRouter.get('/me', authenticate, AuthController.profile);

// No middleware here, just call controller directly

export default authRouter;
