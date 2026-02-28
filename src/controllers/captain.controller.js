import { asyncHandler } from '../utils/asyncHandler.util.js';
import { generateHash } from '../utils/auth.util.js';
import {
  findCaptainByEmail,
  validateCaptainRegisterBody,
} from '../utils/captain.utils.js';
import { createCaptain } from '../services/captain.service.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';
import { loginBodySchema } from '../validation/validation.js';
import { validateSchema } from '../utils/validation.util.js';
import { blacklistToken } from '../utils/authToken.utils.js';
import { ApiError } from '../utils/ApiError.util.js';
import { comparePassword, generateAuthToken } from '../utils/auth.util.js';

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

export const loginCaptain = asyncHandler(async (req, res) => {
  // VALIDATING REQ BODY
  const reqBody = validateSchema(
    loginBodySchema,
    req?.body,
    'Invalid Captain Login Body'
  );

  // FINDING IF CAPTAIN EXISTS
  const captain = await findCaptainByEmail(reqBody.email);

  const loginError = ApiError.badRequest(
    'Unable to Login Captain, Invalid email or password'
  );

  if (!captain) {
    throw loginError;
  }

  // COMPARING THE PASSWORD
  const isPasswordRight = await comparePassword(
    reqBody.password,
    captain.password
  );

  if (!isPasswordRight) {
    throw loginError;
  }

  // AUTHENTIC CAPTAIN

  const authToken = generateAuthToken({ captainId: captain.id });

  const apiResponse = new ApiResponse(200, 'Successfully LoggedIn', {
    authToken,
  });

  // Setting Up Cookies
  const isProduction = Boolean(process.env.NODE_ENV === 'production');
  res.cookie('authToken', authToken, {
    httpOnly: isProduction,
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
    ...(isProduction ? { sameSite: 'strict' } : {}),
  });
  return res.status(200).json(apiResponse.toJSON());
});

// Always Use auth middleware before this route
export const getCaptainProfile = asyncHandler((req, res) => {
  const captain = req?.captain;

  if (!captain) {
    throw ApiError.unauthorized('Unauthorized Invalid, Expired Or No Token');
  }

  const response = new ApiResponse(
    200,
    'Profile Data Retrieved Successfully',
    captain
  );
  return res.status(200).json(response.toJSON());
});

export const logoutCaptain = asyncHandler(async (req, res) => {
  const token = req?.authToken;

  if (!token) {
    throw new ApiError(401, 'Unable To Logout, Invalid or missing token');
  }

  const blacklistedToken = await blacklistToken(token);

  if (blacklistedToken) {
    // Clearing The Cookies
    const isProduction = Boolean(process.env.NODE_ENV === 'production');
    res.clearCookie('authToken', {
      httpOnly: isProduction,
      secure: isProduction,
      ...(isProduction ? { sameSite: 'strict' } : {}),
    });
    return res.status(200).json(
      new ApiResponse(200, 'Captain Logged Out Successfully.', {
        authToken: token,
      }).toJSON()
    );
  }

  throw new ApiError(500, 'Unable to Logout Captain');
});
