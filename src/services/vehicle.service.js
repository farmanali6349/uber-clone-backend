import { db } from '../db/db.js';
import { vehicles } from '../db/schema.js';
import { ApiError } from '../utils/ApiError.util.js';
import { validateVehicleData } from '../utils/vehicle.util.js';

export const createVehicle = async data => {
  try {
    // Validate Vehicle Data
    const vehicleData = validateVehicleData(data);

    const queryResult = await db
      .insert(vehicles)
      .values(vehicleData)
      .onConflictDoNothing({ target: vehicles.plate })
      .returning();

    if (queryResult?.length === 0) {
      throw ApiError.badRequest(
        'Unable To Register Vehicle, Plate Already Exists'
      );
    }

    const vehicle = Array.isArray(queryResult) ? queryResult[0] : queryResult;

    return vehicle;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle PostgreSQL unique constraint violations
    if (error.code === '23505') {
      throw ApiError.badRequest(
        'Unable to register Vehicle, Plate already exists'
      );
    }

    throw ApiError.internalServerError(
      `Error occurred during creating vehicle ${error.message}`
    );
  }
};
