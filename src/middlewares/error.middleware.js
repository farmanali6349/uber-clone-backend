import { ApiError } from '../utils/ApiError.util.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error?.statusCode || 500;
    const message = error?.message || 'Internal Server Error';
    error = new ApiError(
      statusCode,
      message,
      Array.isArray(error.errors) ? error.errors : []
    );
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Error: ', error);
  }

  return res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' && { stack: error?.stack }),
  });
};

export { errorHandler };
