import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";
import Assignment from "../models/Assignment.js";
import Exam from "../models/Exam.js";

/**
 * Admin Overview
 */
const getOverview = async () => {
  const [
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalPayments,
    totalAssignments,
    totalExams,
  ] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Enrollment.countDocuments(),
    Payment.countDocuments(),
    Assignment.countDocuments(),
    Exam.countDocuments(),
  ]);

  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalPayments,
    totalAssignments,
    totalExams,
  };
};

/**
 * Recent Users
 */
const getRecentUsers = async () => {
  return User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(10);
};

/**
 * Recent Enrollments
 */
const getRecentEnrollments =
  async () => {
    return Enrollment.find()
      .populate(
        "student",
        "fullName email"
      )
      .populate(
        "course",
        "title slug"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10);
  };

/**
 * Recent Payments
 */
const getRecentPayments =
  async () => {
    return Payment.find()
      .populate(
        "student",
        "fullName email"
      )
      .populate(
        "course",
        "title slug"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10);
  };

export default {
  getOverview,
  getRecentUsers,
  getRecentEnrollments,
  getRecentPayments,
};