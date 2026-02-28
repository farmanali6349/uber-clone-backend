import { ApiError } from '../utils/ApiError.util.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import {
  comparePassword,
  generateAuthToken,
  generateHash,
} from '../utils/auth.util.js';
import { blacklistToken } from '../utils/authToken.utils.js';
import { createUser, findUserByEmail } from '../utils/user.util.js';
import {
  loginBodySchema,
  registerUserBodySchema,
} from '../validation/validation.js';

export const registerUser = asyncHandler(async (req, res) => {
  // VALIDATING REQUEST BODY
  const validationResult = registerUserBodySchema.safeParse(req.body);
  if (!validationResult.success) {
    throw new ApiError(
      400,
      'Invalid Register Body',
      validationResult.error.issues
    );
  }

  const reqBody = validationResult.data;

  // CREATING NEW USER
  // Hashing The Password
  const passwordHash = await generateHash(reqBody.password);

  // Normalizing User Data
  const userData = { ...reqBody, password: passwordHash };

  // Creating New User
  const user = await createUser(userData);

  const response = new ApiResponse(201, 'User Created Successfully', {
    id: user.id,
    data: user,
  });

  return res.status(201).json(response.toJSON());
});

export const loginUser = asyncHandler(async (req, res) => {
  // VALIDATING REQ BODY
  const validationResult = loginBodySchema.safeParse(req.body);

  if (!validationResult.success) {
    throw new ApiError(
      400,
      'Invalid Login Body',
      validationResult.error.issues
    );
  }

  const reqBody = validationResult.data;

  // FINDING IF USER EXISTS
  const user = await findUserByEmail(reqBody.email);

  const loginError = ApiError.badRequest(
    'Unable to Login, Invalid email or password'
  );

  if (!user) {
    throw loginError;
  }

  // COMPARING THE PASSWORD
  const isPasswordRight = await comparePassword(
    reqBody.password,
    user.password
  );

  if (!isPasswordRight) {
    throw loginError;
  }

  // AUTHENTIC USER

  const authToken = generateAuthToken({ id: user.id });

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
export const getUserProfile = asyncHandler((req, res) => {
  const user = req?.user;

  if (!user) {
    throw new ApiError(401, 'Unauthorized', ['Invalid, Expired Or No Token']);
  }

  const response = new ApiResponse(
    200,
    'Profile Data Retrieved Successfully',
    user
  );
  return res.status(200).json(response.toJSON());
});

export const logoutUser = asyncHandler(async (req, res) => {
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
      new ApiResponse(200, 'Logged Out Successfully.', {
        authToken: token,
      }).toJSON()
    );
  }

  throw new ApiError(500, 'Unable to Logout User');
});
