/**
 * Standard API response helpers.
 * Ensures every endpoint returns a consistent JSON structure.
 */

/**
 * Send a successful API response.
 * @param {import("express").Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 */
export const sendSuccess = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error API response (used by error middleware).
 * @param {import("express").Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 */
export const sendError = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    data,
  });
};
