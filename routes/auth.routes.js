import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import upload from "../helpers/multer.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/auth/login', upload.none() ,AuthController.login);

authRouter.post('/auth//sign-up', upload.none(), AuthController.signUp);

authRouter.post('/auth//logout', authenticate , AuthController.logout);

authRouter.get('/auth//me', authenticate, AuthController.profile);


export default authRouter;
