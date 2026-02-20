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

const registerUser = async (req, res, next) => {
  try {
    // VALIDATING REQUEST BODY
    const validationResult = registerBodySchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Register Body',
        error: validationResult.error.message,
        details: validationResult.error.issues,
      });
    }

    const reqBody = validationResult.data;

    // VALIDATING IF USER ALREADY EXISTS
    const existingUser = await findUserByEmail(reqBody.email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Unable to register User, Email already exist',
      });
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

    return res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      id: user.id,
      data: user,
      authToken,
    });
  } catch (error) {
    // BUG GHOST ERROR COMES HERE DUE TO VALIDATION IN createUser
    return res.status(500).json({
      success: false,
      message: 'Error occured while registering user',
      error,
    });
  }
};

const loginUser = async (req, res, next) => {
  // VALIDATING REQ BODY
  const validationResult = loginBodySchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid Request Body For Login :: ' + validationResult.error.message,
      error: JSON.stringify(validationResult.error.issues),
    });
  }

  try {
    const reqBody = validationResult.data;

    // FINDING IF USER EXISTS
    const user = await findUserByEmail(reqBody.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unable To Login',
        error: 'Invalid email or password',
      });
    }

    // COMPARING THE PASSWORD
    const isPasswordRight = await comparePassword(
      reqBody.password,
      user.password
    );

    if (!isPasswordRight) {
      return res.status(401).json({
        success: false,
        message: 'Unable To Login',
        error: 'Invalid email or password',
      });
    }

    // AUTHENTIC USER

    const authToken = generateAuthToken({ id: user.id });

    return res.status(200).json({
      success: true,
      message: 'Successfully Loggedin',
      authToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Error While Logging In The User',
      error,
    });
  }
};
export { registerUser, loginUser };
