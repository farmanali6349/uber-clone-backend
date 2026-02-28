import { users } from '../db/schema.js';
import { db } from '../db/db.js';
import {
  registerUserBodySchema,
  userSchema,
} from '../validation/validation.js';
import { eq } from 'drizzle-orm';
import { ApiError } from './ApiError.util.js';
import { validateSchema } from './validation.util.js';

const validateUserSchema = userData => {
  try {
    return validateSchema(
      userSchema,
      userData,
      'Invalid User Data For Creating New User'
    );
  } catch (error) {
    throw error;
  }
};

const createUser = async userData => {
  try {
    const data = validateUserSchema(userData);

    // Creating New User
    const queryResult = await db
      .insert(users)
      .values(data)
      .onConflictDoNothing({ target: users.email })
      .returning({
        id: users.id,
        firstname: users.firstname,
        lastname: users.lastname,
        email: users.email,
        socketId: users.socketId,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (queryResult?.length === 0) {
      throw new ApiError(400, 'Unable to register User, Email already exists');
    }

    const user = Array.isArray(queryResult) ? queryResult[0] : queryResult;
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async email => {
  try {
    const queryResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    const user = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    if (!Boolean(user)) {
      return null;
    }

    return user;
  } catch (error) {
    throw new ApiError(500, 'Error occured in findUserByEmail()', error);
  }
};

const findUserById = async userId => {
  try {
    const queryResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    const user = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    if (!Boolean(user)) {
      return null;
    }

    return user;
  } catch (error) {
    throw new ApiError(500, 'Error occured in findUserById()', error);
  }
};

export { createUser, findUserByEmail, findUserById };
