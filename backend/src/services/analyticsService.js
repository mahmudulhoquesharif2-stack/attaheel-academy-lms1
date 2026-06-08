import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";

const getAnalytics = async () => {
  const [
    usersByRole,
    coursesByStatus,
    enrollmentsByStatus,
    paymentsByStatus,
    monthlyRevenue,
  ] = await Promise.all([
    User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]),

    Course.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    Enrollment.aggregate([
      {
        $group: {
          _id: "$approvalStatus",
          count: { $sum: 1 },
        },
      },
    ]),

    Payment.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]),

    Payment.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$paidAt" },
            month: { $month: "$paidAt" },
          },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),
  ]);

  return {
    usersByRole,
    coursesByStatus,
    enrollmentsByStatus,
    paymentsByStatus,
    monthlyRevenue,
  };
};

export default {
  getAnalytics,
};