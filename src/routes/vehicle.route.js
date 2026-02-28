import express from 'express';
import { registerVehicle } from '../controllers/vehicle.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

export const vehicleRoute = express.Router();

vehicleRoute.post('/register', authCaptain, registerVehicle);
