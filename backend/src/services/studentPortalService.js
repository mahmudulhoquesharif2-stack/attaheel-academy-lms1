import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import ExamResult from "../models/ExamResult.js";

/**
 * Student Dashboard
 */
const getStudentDashboard =
  async (studentId) => {
    const enrollments =
      await Enrollment.find({
        student: studentId,
      }).populate(
        "course",
        "title slug"
      );

    const payments =
      await Payment.find({
        student: studentId,
      });

    const submissions =
      await AssignmentSubmission.find({
        student: studentId,
      });

    const results =
      await ExamResult.find({
        student: studentId,
      });

    return {
      totalEnrollments:
        enrollments.length,

      totalPayments:
        payments.length,

      totalAssignments:
        submissions.length,

      totalExamResults:
        results.length,

      enrollments,
    };
  };

/**
 * My Courses
 */
const getMyCourses =
  async (studentId) => {
    return Enrollment.find({
      student: studentId,
      approvalStatus:
        "approved",
    }).populate(
      "course"
    );
  };

/**
 * My Payments
 */
const getMyPayments =
  async (studentId) => {
    return Payment.find({
      student: studentId,
    })
      .populate(
        "course",
        "title slug"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * My Results
 */
const getMyResults =
  async (studentId) => {
    return ExamResult.find({
      student: studentId,
    })
      .populate(
        "exam"
      )
      .sort({
        createdAt: -1,
      });
  };

export default {
  getStudentDashboard,
  getMyCourses,
  getMyPayments,
  getMyResults,
};