import { ApiError } from '../utils/ApiError.util.js';

const notFound = (err, req, res, next) => {
  const error = ApiError.notFound(`Route ${req.originalUrl} Not Found`, err);

  next(error);
};

export { notFound };
