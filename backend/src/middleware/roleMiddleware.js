import AppError from "../utils/AppError.js";

/**
 * Role Authorization Middleware.
 * Restricts access to routes based on the user's role.
 *
 * Usage: authorize("admin", "super_admin")
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Not authorized. Please log in.", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }

    next();
  };
};
