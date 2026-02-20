import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

export { userRoute };
