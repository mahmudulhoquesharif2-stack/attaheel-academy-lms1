import Course from "../models/Course.js";
import AppError from "../utils/AppError.js";

/**
 * Generate a URL-friendly slug from a course title.
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Keep isPublished in sync with status field.
 */
const resolvePublishState = (status) => {
  return status === "published";
};

/**
 * Create a new course (admin only).
 */
const createCourse = async (courseData, createdBy) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    durationMonths,
    feeMadrasa,
    feeGeneral,
    thumbnail,
    freeClassDate,
    admissionDeadline,
    classStartDate,
    status = "draft",
  } = courseData;

  const courseSlug = slug ? slug.toLowerCase().trim() : generateSlug(title);

  const existingCourse = await Course.findOne({ slug: courseSlug });

  if (existingCourse) {
    throw new AppError("A course with this slug already exists", 400);
  }

  const course = await Course.create({
    title,
    slug: courseSlug,
    shortDescription,
    description,
    durationMonths,
    feeMadrasa,
    feeGeneral,
    thumbnail,
    freeClassDate,
    admissionDeadline,
    classStartDate,
    status,
    isPublished: resolvePublishState(status),
    createdBy,
  });

  return course;
};

/**
 * Get all published courses (public).
 */
const getAllCourses = async () => {
  const courses = await Course.find({ status: "published" })
    .select("-__v")
    .sort({ createdAt: -1 });

  return courses;
};

/**
 * Get a single published course by slug (public).
 */
const getCourseBySlug = async (slug) => {
  const course = await Course.findOne({
    slug: slug.toLowerCase(),
    status: "published",
  }).select("-__v");

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return course;
};

export default {
  createCourse,
  getAllCourses,
  getCourseBySlug,
};
