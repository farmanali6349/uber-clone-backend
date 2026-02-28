import {
  registerVehicleSchema,
  vehicleSchema,
} from '../validation/validation.js';
import { validateSchema } from './validation.util.js';

export const validateVehicleRegisterBody = data => {
  return validateSchema(
    registerVehicleSchema,
    data,
    'Invalid Payload For Registering Vehicle'
  );
};

export const validateVehicleData = data => {
  return validateSchema(
    vehicleSchema,
    data,
    'Invalid Payload For Creating Vehicle'
  );
};
