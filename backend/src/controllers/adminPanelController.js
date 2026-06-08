import adminPanelService from "../services/adminPanelService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

/**
 * GET /api/v1/admin-panel/overview
 */
const getOverview =
  asyncHandler(async (req, res) => {
    const data =
      await adminPanelService.getOverview();

    sendSuccess(
      res,
      200,
      "Admin overview fetched successfully",
      data
    );
  });

/**
 * GET /api/v1/admin-panel/recent-users
 */
const getRecentUsers =
  asyncHandler(async (req, res) => {
    const users =
      await adminPanelService.getRecentUsers();

    sendSuccess(
      res,
      200,
      "Recent users fetched successfully",
      users
    );
  });

/**
 * GET /api/v1/admin-panel/recent-enrollments
 */
const getRecentEnrollments =
  asyncHandler(async (req, res) => {
    const enrollments =
      await adminPanelService.getRecentEnrollments();

    sendSuccess(
      res,
      200,
      "Recent enrollments fetched successfully",
      enrollments
    );
  });

/**
 * GET /api/v1/admin-panel/recent-payments
 */
const getRecentPayments =
  asyncHandler(async (req, res) => {
    const payments =
      await adminPanelService.getRecentPayments();

    sendSuccess(
      res,
      200,
      "Recent payments fetched successfully",
      payments
    );
  });

export default {
  getOverview,
  getRecentUsers,
  getRecentEnrollments,
  getRecentPayments,
};