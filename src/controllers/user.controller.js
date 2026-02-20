import { ApiError } from '../utils/ApiError.util.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import {
  comparePassword,
  generateAuthToken,
  generateHash,
} from '../utils/auth.util.js';
import { createUser, findUserByEmail } from '../utils/user.util.js';
import {
  loginBodySchema,
  registerBodySchema,
} from '../validation/validation.js';

const registerUser = asyncHandler(async (req, res) => {
  // VALIDATING REQUEST BODY
  const validationResult = registerBodySchema.safeParse(req.body);
  if (!validationResult.success) {
    throw new ApiError(
      400,
      'Invalid Register Body',
      validationResult.error.issues
    );
  }

  const reqBody = validationResult.data;

  // VALIDATING IF USER ALREADY EXISTS
  const existingUser = await findUserByEmail(reqBody.email);

  if (existingUser) {
    throw new ApiError(400, 'Unable to register User, Email already exists');
  }

  // CREATING NEW USER
  // Hashing The Password
  const passwordHash = await generateHash(reqBody.password);

  // Normalizing User Data
  const userData = { ...reqBody, password: passwordHash };

  // Creating New User
  const user = await createUser(userData);

  // Generating Token For User
  const authToken = generateAuthToken({ id: user.id });

  const response = new ApiResponse(201, 'User Created Successfully', {
    id: user.id,
    data: user,
    authToken,
  });

  return res.status(201).json(response.toJSON());
});

const loginUser = asyncHandler(async (req, res) => {
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

  const loginError = ApiError.badRequest(400, 'Unable to Login', [
    'Invalid email or password',
  ]);

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
  return res.status(200).json(apiResponse.toJSON());
});

// Always Use auth middleware before this route
const getUserProfile = async (req, res, next) => {
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
};

export { registerUser, loginUser, getUserProfile };
