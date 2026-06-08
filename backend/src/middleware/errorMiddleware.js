import { sendError } from "../utils/apiResponse.js";

/**
 * Global Error Handling Middleware.
 * Catches all thrown errors and returns a standardized JSON response.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose duplicate key errors (e.g. unique email/phone)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Log unexpected server errors for debugging
  if (statusCode === 500) {
    console.error("Unhandled Error:", err);
  }

  sendError(res, statusCode, message, null);
};

/**
 * 404 Not Found handler for undefined routes.
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
