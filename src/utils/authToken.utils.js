import { eq } from 'drizzle-orm';
import { db } from '../db/db.js';
import { tokenBlacklist } from '../db/schema.js';

const blacklistToken = async authToken => {
  try {
    const queryRes = await db
      .insert(tokenBlacklist)
      .values({ authToken })
      .returning();
    const token = Array.isArray(queryRes) ? queryRes[0] : queryRes;

    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error occured in blacklisting Token :: ', error);
    }
    throw error;
  }
};

const findToken = async authToken => {
  try {
    const queryRes = await db
      .select()
      .from(tokenBlacklist)
      .where(eq(tokenBlacklist.authToken, authToken));

    const token = Array.isArray(queryRes) ? queryRes[0] : queryRes;
    if (!token) {
      return null;
    }

    return token;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error occured in finding Token :: ', error);
    }
    throw error;
  }
};

export { blacklistToken, findToken };
