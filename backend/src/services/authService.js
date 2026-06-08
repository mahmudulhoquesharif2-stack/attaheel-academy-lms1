import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TokenBlacklist from "../models/TokenBlacklist.js";
import generateToken from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";

/**
 * Strip sensitive fields before sending user data in API responses.
 */
const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;

  const { password, ...safeUser } = userObject;
  return safeUser;
};

/**
 * Register a new user with hashed password and return a JWT.
 */
const registerUser = async ({ fullName, email, phone, password, role }) => {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new AppError("Email already exists", 400);
  }

  const existingPhone = await User.findOne({ phone });

  if (existingPhone) {
    throw new AppError("Phone already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    // Only allow role override if explicitly provided; defaults to "student" via schema
    ...(role && { role }),
  });

  const token = generateToken(user._id, user.role);

  return {
    user: sanitizeUser(user),
    token,
  };
};

/**
 * Authenticate a user by email and password.
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Your account has been deactivated", 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user._id, user.role);

  return {
    user: sanitizeUser(user),
    token,
  };
};

/**
 * Invalidate the current JWT by adding it to the blacklist.
 */
const logoutUser = async (token) => {
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.exp) {
    throw new AppError("Invalid token", 400);
  }

  // Avoid duplicate blacklist entries
  const existing = await TokenBlacklist.findOne({ token });

  if (existing) {
    return;
  }

  await TokenBlacklist.create({
    token,
    expiresAt: new Date(decoded.exp * 1000),
  });
};

/**
 * Fetch the authenticated user's profile.
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
