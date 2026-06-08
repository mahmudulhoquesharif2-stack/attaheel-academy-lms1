import enrollmentService from "../services/enrollmentService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/enrollments
 */
const createEnrollment = asyncHandler(
  async (req, res) => {
    const { courseId } = req.body;

    if (!courseId) {
      throw new AppError(
        "Course ID is required",
        400
      );
    }

    const enrollment =
      await enrollmentService.createEnrollment(
        req.user._id,
        courseId
      );

    sendSuccess(
      res,
      201,
      "Enrollment created successfully",
      enrollment
    );
  }
);

/**
 * GET /api/v1/enrollments/my-courses
 */
const getMyCourses = asyncHandler(
  async (req, res) => {
    const courses =
      await enrollmentService.getMyCourses(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "My courses fetched successfully",
      courses
    );
  }
);

/**
 * GET /api/v1/enrollments
 */
const getAllEnrollments =
  asyncHandler(async (req, res) => {
    const enrollments =
      await enrollmentService.getAllEnrollments();

    sendSuccess(
      res,
      200,
      "Enrollments fetched successfully",
      enrollments
    );
  });

/**
 * PATCH /api/v1/enrollments/:id/approve
 */
const approveEnrollment =
  asyncHandler(async (req, res) => {
    const enrollment =
      await enrollmentService.approveEnrollment(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Enrollment approved",
      enrollment
    );
  });

/**
 * PATCH /api/v1/enrollments/:id/reject
 */
const rejectEnrollment =
  asyncHandler(async (req, res) => {
    const enrollment =
      await enrollmentService.rejectEnrollment(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Enrollment rejected",
      enrollment
    );
  });

export default {
  createEnrollment,
  getMyCourses,
  getAllEnrollments,
  approveEnrollment,
  rejectEnrollment,
};