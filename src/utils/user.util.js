import { users } from '../db/schema.js';
import { db } from '../db/db.js';
import { userSchema } from '../validation/validation.js';
import { eq } from 'drizzle-orm';
import { ApiError } from './ApiError.util.js';

const validateUserSchema = userData => {
  const result = userSchema.safeParse(userData);

  if (!result.success) {
    throw ApiError.badRequest(
      'Invalid User Data For Creating New User',
      result.error.issues
    );
  }

  return result.data;
};

const createUser = async userData => {
  try {
    const data = validateUserSchema(userData);

    // Creating New User
    const queryResult = await db.insert(users).values(data).returning();
    const user = Array.isArray(queryResult) ? queryResult[0] : queryResult;
    const { id, firstname, lastname, email } = user;
    return { id, firstname, lastname, email };
  } catch (error) {
    throw new ApiError(
      500,
      `Error occurred during user creation: ${error.message}`,
      error
    );
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
