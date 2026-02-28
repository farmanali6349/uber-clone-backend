import {
  captainSchema,
  registerCaptainBodySchema,
} from '../validation/validation.js';
import { validateSchema } from './validation.util.js';

export const validateCaptainRegisterBody = body => {
  return validateSchema(
    registerCaptainBodySchema,
    body,
    'Invalid Captain Register Body'
  );
};

export const validateCaptainData = data => {
  return validateSchema(captainSchema, data, 'Invalid Captain Data');
};
