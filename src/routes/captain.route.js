import express from 'express';
import { registerCaptain } from '../controllers/captain.controller.js';

export const captainRoute = express.Router();

captainRoute.post('/register', registerCaptain);
