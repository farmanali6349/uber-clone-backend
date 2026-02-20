import { ApiError } from '../utils/ApiError.util.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { decodeToken } from '../utils/auth.util.js';
import { findUserById } from '../utils/user.util.js';

const authUser = asyncHandler(async (req, res, next) => {
  const token =
    req?.cookies?.token || req?.headers?.authorization?.split(' ')[1];

  console.log('Token :: ', token);

  const authError = ApiError.unauthorized(
    'Unauthorized :: Invalid, Expired Or No Token'
  );

  if (!token) {
    throw authError;
  }

  const decoded = decodeToken(token);

  const userId = decoded?.id ? Number.parseInt(decoded?.id) : null;

  if (!userId || Number.isNaN(userId)) {
    throw authError;
  }

  const user = await findUserById(userId);

  if (!user) {
    throw authError;
  }

  req.user = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  next();
});

export { authUser };
