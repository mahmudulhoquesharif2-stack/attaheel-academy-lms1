import ExamResult from "../models/ExamResult.js";
import Exam from "../models/Exam.js";
import AppError from "../utils/AppError.js";

/**
 * Calculate Grade
 */
const calculateGrade = (
  marks,
  totalMarks
) => {
  const percentage =
    (marks / totalMarks) * 100;

  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";

  return "F";
};

/**
 * Publish Result
 */
const publishResult = async (
  resultData
) => {
  const {
    examId,
    studentId,
    marksObtained,
    remarks,
  } = resultData;

  const exam =
    await Exam.findById(
      examId
    );

  if (!exam) {
    throw new AppError(
      "Exam not found",
      404
    );
  }

  const existingResult =
    await ExamResult.findOne({
      exam: examId,
      student: studentId,
    });

  if (existingResult) {
    throw new AppError(
      "Result already published",
      400
    );
  }

  const grade =
    calculateGrade(
      marksObtained,
      exam.totalMarks
    );

  const status =
    marksObtained >=
    exam.passingMarks
      ? "passed"
      : "failed";

  const result =
    await ExamResult.create({
      exam: examId,
      student: studentId,
      marksObtained,
      grade,
      status,
      remarks,
    });

  return result;
};

/**
 * Student Results
 */
const getMyResults =
  async (studentId) => {
    return ExamResult.find({
      student: studentId,
    })
      .populate(
        "exam",
        "title totalMarks passingMarks"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Exam Results
 */
const getExamResults =
  async (examId) => {
    return ExamResult.find({
      exam: examId,
    })
      .populate(
        "student",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });
  };

export default {
  publishResult,
  getMyResults,
  getExamResults,
};