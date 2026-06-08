import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalStudents,
    totalTeachers,
    totalCourses,
    totalEnrollments,
    totalPayments,
    pendingPayments,
    pendingEnrollments,
    revenueData,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "teacher" }),
    Course.countDocuments(),
    Enrollment.countDocuments(),
    Payment.countDocuments(),
    Payment.countDocuments({ paymentStatus: "pending" }),
    Enrollment.countDocuments({
      approvalStatus: "pending",
    }),
    Payment.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]),
  ]);

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalCourses,
    totalEnrollments,
    totalPayments,
    pendingPayments,
    pendingEnrollments,
    totalRevenue:
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0,
  };
};

export default {
  getDashboardStats,
};