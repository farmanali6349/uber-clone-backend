import {
  captainSchema,
  registerCaptainBodySchema,
} from '../validation/validation.js';
import { validateSchema } from './validation.util.js';
import { db } from '../db/db.js';
import { captains } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { ApiError } from './ApiError.util.js';

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

export const findCaptainById = async captainId => {
  try {
    const queryResult = await db
      .select({
        id: captains.id,
        firstname: captains.firstname,
        lastname: captains?.lastname,
        email: captains.email,
        socketId: captains.socketId,
        createdAt: captains.createdAt,
        updatedAt: captains.updatedAt,
      })
      .from(captains)
      .where(eq(captains.id, captainId));

    const captain = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    return captain || null;
  } catch (error) {
    throw new ApiError(500, 'Error occured in findCaptainById()', error);
  }
};

export const findCaptainByEmail = async email => {
  try {
    const queryResult = await db
      .select()
      .from(captains)
      .where(eq(captains.email, email));

    const captain = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    if (!Boolean(captain)) {
      return null;
    }

    return captain;
  } catch (error) {
    throw new ApiError(500, 'Error occured in findCaptainByEmail()', error);
  }
};
