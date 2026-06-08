import assignmentSubmissionService from "../services/assignmentSubmissionService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/assignment-submissions
 */
const submitAssignment = asyncHandler(
  async (req, res) => {
    const {
      assignmentId,
    } = req.body;

    if (!assignmentId) {
      throw new AppError(
        "Please provide assignmentId",
        400
      );
    }

    const submission =
      await assignmentSubmissionService.submitAssignment(
        req.user._id,
        req.body
      );

    sendSuccess(
      res,
      201,
      "Assignment submitted successfully",
      submission
    );
  }
);

/**
 * GET /api/v1/assignment-submissions/my-submissions
 */
const getMySubmissions =
  asyncHandler(async (req, res) => {
    const submissions =
      await assignmentSubmissionService.getMySubmissions(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Submissions fetched successfully",
      submissions
    );
  });

/**
 * GET /api/v1/assignment-submissions/assignment/:id
 */
const getAssignmentSubmissions =
  asyncHandler(async (req, res) => {
    const submissions =
      await assignmentSubmissionService.getAssignmentSubmissions(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Assignment submissions fetched successfully",
      submissions
    );
  });

/**
 * PATCH /api/v1/assignment-submissions/:id/grade
 */
const gradeSubmission =
  asyncHandler(async (req, res) => {
    const submission =
      await assignmentSubmissionService.gradeSubmission(
        req.params.id,
        req.body
      );

    sendSuccess(
      res,
      200,
      "Submission graded successfully",
      submission
    );
  });

export default {
  submitAssignment,
  getMySubmissions,
  getAssignmentSubmissions,
  gradeSubmission,
};