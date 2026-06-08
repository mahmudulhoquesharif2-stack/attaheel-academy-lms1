import examService from "../services/examService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/exams
 */
const createExam = asyncHandler(
  async (req, res) => {
    const {
      title,
      course,
      totalMarks,
      passingMarks,
      examDate,
      durationMinutes,
    } = req.body;

    if (
      !title ||
      !course ||
      !totalMarks ||
      !passingMarks ||
      !examDate ||
      !durationMinutes
    ) {
      throw new AppError(
        "Please provide title, course, totalMarks, passingMarks, examDate and durationMinutes",
        400
      );
    }

    const exam =
      await examService.createExam(
        req.body,
        req.user._id
      );

    sendSuccess(
      res,
      201,
      "Exam created successfully",
      exam
    );
  }
);

/**
 * GET /api/v1/exams
 */
const getAllExams =
  asyncHandler(async (req, res) => {
    const exams =
      await examService.getAllExams();

    sendSuccess(
      res,
      200,
      "Exams fetched successfully",
      exams
    );
  });

/**
 * GET /api/v1/exams/:id
 */
const getExamById =
  asyncHandler(async (req, res) => {
    const exam =
      await examService.getExamById(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Exam fetched successfully",
      exam
    );
  });

export default {
  createExam,
  getAllExams,
  getExamById,
};