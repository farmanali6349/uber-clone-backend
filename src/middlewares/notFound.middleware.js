import { ApiError } from '../utils/ApiError.util.js';

const notFound = (req, res, next) => {
  const error = new ApiError.notFound(`Route ${req.originalUrl} Not Found`);

  next(error);
};

export { notFound };
