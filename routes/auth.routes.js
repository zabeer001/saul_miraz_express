import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import upload from "../helpers/multer.js";
import { authenticate } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/login', upload.array('photos', 3), AuthController.login);

authRouter.post('/sign-up', upload.none(), AuthController.signUp);

authRouter.post('/logout', AuthController.logout);

authRouter.get('/profile-details', authenticate, AuthController.profile);

// No middleware here, just call controller directly

export default authRouter;
