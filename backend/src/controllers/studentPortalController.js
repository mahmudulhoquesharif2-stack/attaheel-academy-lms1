import studentPortalService from "../services/studentPortalService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

/**
 * GET /api/v1/student-portal/dashboard
 */
const getDashboard =
  asyncHandler(async (req, res) => {
    const data =
      await studentPortalService.getStudentDashboard(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Dashboard fetched successfully",
      data
    );
  });

/**
 * GET /api/v1/student-portal/courses
 */
const getMyCourses =
  asyncHandler(async (req, res) => {
    const courses =
      await studentPortalService.getMyCourses(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Courses fetched successfully",
      courses
    );
  });

/**
 * GET /api/v1/student-portal/payments
 */
const getMyPayments =
  asyncHandler(async (req, res) => {
    const payments =
      await studentPortalService.getMyPayments(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Payments fetched successfully",
      payments
    );
  });

/**
 * GET /api/v1/student-portal/results
 */
const getMyResults =
  asyncHandler(async (req, res) => {
    const results =
      await studentPortalService.getMyResults(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Results fetched successfully",
      results
    );
  });

export default {
  getDashboard,
  getMyCourses,
  getMyPayments,
  getMyResults,
};