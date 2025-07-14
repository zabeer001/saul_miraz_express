
import { signUpService } from '../services/auth/signup.service.js';
import { loginService } from '../services/auth/login.service.js';
import { logoutService } from '../services/auth/logout.service.js';
import {googleLogin} from '../services/auth/googleLogin.js';



class AuthController {
  static async signUp(req, res) {
    try {
      const result = await signUpService(req.body);
      return res.status(201).json({
        message: 'User registered successfully',
        ...result,
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(400).json({
        message: 'Signup failed',
        error: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const result = await loginService(req.body);
      return res.status(201).json({
        message: 'User login successfully',
        ...result,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(400).json({
        message: 'Login failed',
        error: error.message,
      });
    }
  }

  static async logout(req, res) {
    const token = req.headers.authorization?.split(' ')[1]; // ✅ Extract token from header

    try {
      const result = await logoutService(token);
      return res.json(result);
    } catch (err) {
      console.error('Logout error:', err.message);
      return res.status(400).json({ message: err.message });
    }
  }

  static async profile(req, res) {
    try {
      const user = req.authUser; // 👈 already fetched in middleware

      return res.json({
        message: 'Profile retrieved successfully',
        user,
      });
    } catch (err) {
      console.error('Profile fetch error:', err.message);
      return res.status(400).json({ message: err.message });
    }
  }

  static async loginWithGoogle(req, res) {
    try {
        const result = await googleLogin(req.body);
        return res.status(result.status).json(result);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(400).json({
            message: 'Login failed',
            error: error.message,
        });
    }
}

}

export default AuthController;
