import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import AppError from "../utils/AppError.js";

/**
 * Student Apply For Course
 */
const createEnrollment = async (
  studentId,
  courseId
) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new AppError(
      "Course not found",
      404
    );
  }

  const existingEnrollment =
    await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

  if (existingEnrollment) {
    throw new AppError(
      "Already enrolled in this course",
      400
    );
  }

  const enrollment =
    await Enrollment.create({
      student: studentId,
      course: courseId,
      createdBy: studentId,
    });

  return enrollment;
};

/**
 * Student My Courses
 */
const getMyCourses = async (
  studentId
) => {
  return Enrollment.find({
    student: studentId,
  })
    .populate("course")
    .sort({
      createdAt: -1,
    });
};

/**
 * Admin All Enrollments
 */
const getAllEnrollments =
  async () => {
    return Enrollment.find()
      .populate(
        "student",
        "fullName email phone"
      )
      .populate(
        "course",
        "title slug"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Approve Enrollment
 */
const approveEnrollment =
  async (enrollmentId) => {
    const enrollment =
      await Enrollment.findById(
        enrollmentId
      );

    if (!enrollment) {
      throw new AppError(
        "Enrollment not found",
        404
      );
    }

    enrollment.approvalStatus =
      "approved";

    await enrollment.save();

    return enrollment;
  };

/**
 * Reject Enrollment
 */
const rejectEnrollment =
  async (enrollmentId) => {
    const enrollment =
      await Enrollment.findById(
        enrollmentId
      );

    if (!enrollment) {
      throw new AppError(
        "Enrollment not found",
        404
      );
    }

    enrollment.approvalStatus =
      "rejected";

    await enrollment.save();

    return enrollment;
  };

export default {
  createEnrollment,
  getMyCourses,
  getAllEnrollments,
  approveEnrollment,
  rejectEnrollment,
};