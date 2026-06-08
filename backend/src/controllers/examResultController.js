import examResultService from "../services/examResultService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/exam-results
 */
const publishResult = asyncHandler(
  async (req, res) => {
    const {
      examId,
      studentId,
      marksObtained,
    } = req.body;

    if (
      !examId ||
      !studentId ||
      marksObtained === undefined
    ) {
      throw new AppError(
        "Please provide examId, studentId and marksObtained",
        400
      );
    }

    const result =
      await examResultService.publishResult(
        req.body
      );

    sendSuccess(
      res,
      201,
      "Result published successfully",
      result
    );
  }
);

/**
 * GET /api/v1/exam-results/my-results
 */
const getMyResults =
  asyncHandler(async (req, res) => {
    const results =
      await examResultService.getMyResults(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Results fetched successfully",
      results
    );
  });

/**
 * GET /api/v1/exam-results/exam/:id
 */
const getExamResults =
  asyncHandler(async (req, res) => {
    const results =
      await examResultService.getExamResults(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Exam results fetched successfully",
      results
    );
  });

export default {
  publishResult,
  getMyResults,
  getExamResults,
};