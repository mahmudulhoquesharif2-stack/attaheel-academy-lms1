import assignmentService from "../services/assignmentService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/assignments
 */
const createAssignment = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      course,
      dueDate,
    } = req.body;

    if (
      !title ||
      !description ||
      !course ||
      !dueDate
    ) {
      throw new AppError(
        "Please provide title, description, course and dueDate",
        400
      );
    }

    const assignment =
      await assignmentService.createAssignment(
        req.body,
        req.user._id
      );

    sendSuccess(
      res,
      201,
      "Assignment created successfully",
      assignment
    );
  }
);

/**
 * GET /api/v1/assignments
 */
const getAllAssignments =
  asyncHandler(async (req, res) => {
    const assignments =
      await assignmentService.getAllAssignments();

    sendSuccess(
      res,
      200,
      "Assignments fetched successfully",
      assignments
    );
  });

/**
 * GET /api/v1/assignments/:id
 */
const getAssignmentById =
  asyncHandler(async (req, res) => {
    const assignment =
      await assignmentService.getAssignmentById(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Assignment fetched successfully",
      assignment
    );
  });

/**
 * PUT /api/v1/assignments/:id
 */
const updateAssignment =
  asyncHandler(async (req, res) => {
    const assignment =
      await assignmentService.updateAssignment(
        req.params.id,
        req.body
      );

    sendSuccess(
      res,
      200,
      "Assignment updated successfully",
      assignment
    );
  });

/**
 * DELETE /api/v1/assignments/:id
 */
const deleteAssignment =
  asyncHandler(async (req, res) => {
    await assignmentService.deleteAssignment(
      req.params.id
    );

    sendSuccess(
      res,
      200,
      "Assignment deleted successfully",
      null
    );
  });

export default {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};