import { decodeToken } from '../utils/auth.util.js';
import { findUserById } from '../utils/user.util.js';

const authUser = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization ||
      req?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized :: Invalid, Expired Or No Token',
      });
    }

    const decoded = decodeToken(token);

    const userId = decoded?.id ? Number.parseInt(decoded?.id) : null;

    if (!userId || Number.isNaN(userId)) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized :: Invalid, Expired Or No Token',
      });
    }

    const user = await findUserById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized :: Invalid, Expired Or No Token',
      });
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
  } catch (error) {
    if (
      ['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(
        error?.name
      )
    ) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized :: Invalid, Expired Or No Token',
      });
    }

    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal error while authenticating user',
    });
  }
};

export { authUser };
