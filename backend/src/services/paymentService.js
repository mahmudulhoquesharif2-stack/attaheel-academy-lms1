import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
import AppError from "../utils/AppError.js";

/**
 * Create Payment
 */
const createPayment = async (
  studentId,
  paymentData
) => {
  const {
    enrollmentId,
    amount,
    paymentMethod,
    transactionId,
  } = paymentData;

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

  const existingPayment =
    await Payment.findOne({
      transactionId,
    });

  if (existingPayment) {
    throw new AppError(
      "Transaction ID already exists",
      400
    );
  }

  const payment =
    await Payment.create({
      student: studentId,
      course: enrollment.course,
      enrollment: enrollment._id,

      amount,
      paymentMethod,
      transactionId,

      paymentStatus: "pending",
    });

  return payment;
};

/**
 * My Payments
 */
const getMyPayments = async (
  studentId
) => {
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
 * Admin All Payments
 */
const getAllPayments =
  async () => {
    return Payment.find()
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
 * Approve Payment
 */
const approvePayment =
  async (paymentId) => {
    const payment =
      await Payment.findById(
        paymentId
      );

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    payment.paymentStatus =
      "paid";

    payment.paidAt =
      new Date();

    await payment.save();

    const enrollment =
      await Enrollment.findById(
        payment.enrollment
      );

    if (enrollment) {
      enrollment.paymentStatus =
        "paid";

      await enrollment.save();
    }

    return payment;
  };

/**
 * Reject Payment
 */
const rejectPayment =
  async (paymentId) => {
    const payment =
      await Payment.findById(
        paymentId
      );

    if (!payment) {
      throw new AppError(
        "Payment not found",
        404
      );
    }

    payment.paymentStatus =
      "failed";

    await payment.save();

    return payment;
  };

export default {
  createPayment,
  getMyPayments,
  getAllPayments,
  approvePayment,
  rejectPayment,
};