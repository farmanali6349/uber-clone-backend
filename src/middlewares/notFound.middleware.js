import { ApiError } from '../utils/ApiError.util.js';

const notFound = (req, res, next) => {
  const error = ApiError.notFound(`Route ${req.originalUrl} Not Found`);

  next(error);
};

export { notFound };
