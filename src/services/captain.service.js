import { db } from '../db/db.js';
import { captains } from '../db/schema.js';
import { validateCaptainData } from '../utils/captain.utils.js';
import { ApiError } from '../utils/ApiError.util.js';

// CREATE / REGISTER NEW CAPTAIN
export const createCaptain = async data => {
  try {
    // Validate Captain Data
    const captainData = validateCaptainData(data);

    // Create New Captain
    const queryResult = await db
      .insert(captains)
      .values(captainData)
      .onConflictDoNothing({ target: captains.email })
      .returning({
        id: captains.id,
        firstname: captains.firstname,
        lastname: captains.lastname,
        email: captains.email,
        socketId: captains.socketId,
        createdAt: captains.createdAt,
        updatedAt: captains.updatedAt,
      });

    if (queryResult?.length === 0) {
      throw new ApiError(
        400,
        'Unable to register Captain, Email already exists'
      );
    }

    const captain = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    return captain;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle PostgreSQL unique constraint violations
    if (error.code === '23505') {
      throw ApiError.badRequest(
        'Unable to register Captain, Email already exists'
      );
    }

    throw ApiError.internalServerError(
      `Error occurred during captain creation: ${error.message}`
    );
  }
};
