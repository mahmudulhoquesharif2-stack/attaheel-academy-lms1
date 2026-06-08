/**
 * Custom application error class for consistent error handling.
 * Extends native Error with an HTTP status code for the response layer.
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
