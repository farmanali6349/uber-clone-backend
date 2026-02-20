import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/profile', authUser, getUserProfile);

export { userRoute };
