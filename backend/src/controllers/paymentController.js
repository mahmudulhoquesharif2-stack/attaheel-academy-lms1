import paymentService from "../services/paymentService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/payments
 */
const createPayment = asyncHandler(
  async (req, res) => {
    const {
      enrollmentId,
      amount,
      paymentMethod,
      transactionId,
    } = req.body;

    if (
      !enrollmentId ||
      !amount ||
      !paymentMethod ||
      !transactionId
    ) {
      throw new AppError(
        "Please provide enrollmentId, amount, paymentMethod and transactionId",
        400
      );
    }

    const payment =
      await paymentService.createPayment(
        req.user._id,
        req.body
      );

    sendSuccess(
      res,
      201,
      "Payment submitted successfully",
      payment
    );
  }
);

/**
 * GET /api/v1/payments/my-payments
 */
const getMyPayments = asyncHandler(
  async (req, res) => {
    const payments =
      await paymentService.getMyPayments(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Payments fetched successfully",
      payments
    );
  }
);

/**
 * GET /api/v1/payments
 */
const getAllPayments =
  asyncHandler(async (req, res) => {
    const payments =
      await paymentService.getAllPayments();

    sendSuccess(
      res,
      200,
      "All payments fetched successfully",
      payments
    );
  });

/**
 * PATCH /api/v1/payments/:id/approve
 */
const approvePayment =
  asyncHandler(async (req, res) => {
    const payment =
      await paymentService.approvePayment(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Payment approved successfully",
      payment
    );
  });

/**
 * PATCH /api/v1/payments/:id/reject
 */
const rejectPayment =
  asyncHandler(async (req, res) => {
    const payment =
      await paymentService.rejectPayment(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Payment rejected successfully",
      payment
    );
  });

export default {
  createPayment,
  getMyPayments,
  getAllPayments,
  approvePayment,
  rejectPayment,
};