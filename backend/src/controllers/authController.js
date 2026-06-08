import authService from "../services/authService.js";
import { sendSuccess } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/auth/register
 * Register a new user account.
 */
const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    throw new AppError("Please provide fullName, email, phone, and password", 400);
  }

  const result = await authService.registerUser(req.body);

  sendSuccess(res, 201, "User registered successfully", result);
});

/**
 * POST /api/v1/auth/login
 * Authenticate user and return JWT.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const result = await authService.loginUser(req.body);

  sendSuccess(res, 200, "Login successful", result);
});

/**
 * POST /api/v1/auth/logout
 * Invalidate the current JWT token.
 */
const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("No token provided", 400);
  }

  await authService.logoutUser(token);

  sendSuccess(res, 200, "Logout successful", null);
});

/**
 * GET /api/v1/auth/profile
 * Return the authenticated user's profile.
 */
const getProfile = asyncHandler(async (req, res) => {
  const profile = await authService.getUserProfile(req.user._id);

  sendSuccess(res, 200, "Profile fetched successfully", profile);
});

export default {
  register,
  login,
  logout,
  getProfile,
};
