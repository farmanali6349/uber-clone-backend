import express from 'express';
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

export const captainRoute = express.Router();

captainRoute.post('/register', registerCaptain);
captainRoute.post('/login', loginCaptain);
captainRoute.get('/profile', authCaptain, getCaptainProfile);
captainRoute.post('/logout', authCaptain, logoutCaptain);
