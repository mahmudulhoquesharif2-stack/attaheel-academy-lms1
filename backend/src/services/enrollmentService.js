import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import AppError from "../utils/AppError.js";

/**
 * Student Apply For Course
 */
const createEnrollment = async (
  studentId,
  courseId,
  studentType
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
    if (
      existingEnrollment.approvalStatus ===
      "pending"
    ) {
      throw new AppError(
        "You already have a pending enrollment for this course",
        400
      );
    }

    if (
      existingEnrollment.approvalStatus ===
      "approved"
    ) {
      throw new AppError(
        "You are already enrolled in this course",
        400
      );
    }

    if (
      existingEnrollment.approvalStatus ===
      "rejected"
    ) {
      await Enrollment.findByIdAndDelete(
        existingEnrollment._id
      );
    }
  }

  const enrollment =
    await Enrollment.create({
      student: studentId,
      course: courseId,
      studentType,
      createdBy: studentId,
    });

  return enrollment;
};

/**
 * My Courses
 */
const getMyCourses = async (
  studentId
) => {
  return Enrollment.find({
    student: studentId,
    approvalStatus: "approved",
    paymentStatus: "paid",
  })
    .populate("course")
    .sort({
      createdAt: -1,
    });
};

/**
 * Admin - All Enrollments
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
      .populate(
  "batch",
  "name batchType classTime"
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

  /**
 * Assign Batch
 */
const assignBatch = async (
  enrollmentId,
  batchId
) => {
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

  enrollment.batch = batchId;

  await enrollment.save();

  return enrollment;
};

export default {
  createEnrollment,
  getMyCourses,
  getAllEnrollments,
  approveEnrollment,
  rejectEnrollment,
  assignBatch,
};