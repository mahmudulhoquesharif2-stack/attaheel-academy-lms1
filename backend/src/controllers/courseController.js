import courseService from "../services/courseService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/courses
 * Create a new course (admin / super_admin only).
 */
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    shortDescription,
    description,
    durationMonths,
    feeMadrasa,
    feeGeneral,
  } = req.body;

  if (
    !title ||
    !shortDescription ||
    !description ||
    durationMonths === undefined ||
    feeMadrasa === undefined ||
    feeGeneral === undefined
  ) {
    throw new AppError(
      "Please provide title, shortDescription, description, durationMonths, feeMadrasa, and feeGeneral",
      400
    );
  }

  const course = await courseService.createCourse(req.body, req.user._id);

  sendSuccess(res, 201, "Course created successfully", course);
});

/**
 * GET /api/v1/courses
 * Get all published courses (public).
 */
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseService.getAllCourses();

  sendSuccess(res, 200, "Courses fetched successfully", courses);
});

/**
 * GET /api/v1/courses/:slug
 * Get a single published course by slug (public).
 */
const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await courseService.getCourseBySlug(req.params.slug);

  sendSuccess(res, 200, "Course fetched successfully", course);
});

export default {
  createCourse,
  getAllCourses,
  getCourseBySlug,
};
