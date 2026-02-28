import { asyncHandler } from '../utils/asyncHandler.util.js';
import { generateHash } from '../utils/auth.util.js';
import { validateCaptainRegisterBody } from '../utils/captain.utils.js';
import { createCaptain } from '../services/captain.service.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';

export const registerCaptain = asyncHandler(async (req, res) => {
  // Validate The Captain Register Body
  const captainRegisterBody = validateCaptainRegisterBody(req?.body);

  // Normalizing Data For Captain Creation
  // Generating Password Hash
  const passwordHash = await generateHash(captainRegisterBody.password);

  const captainData = { ...captainRegisterBody, password: passwordHash };

  // Create New Captain
  const captain = await createCaptain(captainData);

  return res
    .status(201)
    .json(new ApiResponse(201, 'Captain Created Successfully', captain));
});
