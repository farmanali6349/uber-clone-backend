import { createVehicle } from '../services/vehicle.service.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { validateVehicleRegisterBody } from '../utils/vehicle.util.js';

export const registerVehicle = asyncHandler(async (req, res) => {
  // Validating Register Vehicle Body
  const { vehicleType, capacity, plate, color } = req.body ?? {};
  const vehicleRegisterBody = validateVehicleRegisterBody({
    vehicleType,
    capacity,
    plate,
    color,
    captainId: req.captain.id,
  });

  // CREATING NEW VEHICLE
  const vehicle = await createVehicle(vehicleRegisterBody);

  return res
    .status(201)
    .json(new ApiResponse(201, 'Vehicle Created Successfully', vehicle));
});
