import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * JWT Authentication Middleware.
 * Verifies the Bearer token, checks blacklist, and attaches the user to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract token from Authorization header: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authorized. Please log in.", 401);
  }

  const blacklistedToken = await TokenBlacklist.findOne({ token });
// Check if the token is blacklisted (e.g. after logout)
  if (blacklistedToken) {
    throw new AppError("Session expired. Please log in again.", 401);
  }

  // Verify and decode the JWT payload
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new AppError("Invalid or expired token. Please log in again.", 401);
  }

  // Load the user and exclude the password field
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("User no longer exists.", 401);
  }

  if (!user.isActive) {
    throw new AppError("Your account has been deactivated.", 403);
  }

  req.user = user;
  next();
});
