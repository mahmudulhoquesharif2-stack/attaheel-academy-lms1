import Exam from "../models/Exam.js";
import Course from "../models/Course.js";
import AppError from "../utils/AppError.js";

/**
 * Create Exam
 */
const createExam = async (
  examData,
  createdBy
) => {
  const {
    title,
    course,
    description,
    totalMarks,
    passingMarks,
    examDate,
    durationMinutes,
    status = "draft",
  } = examData;

  const existingCourse =
    await Course.findById(course);

  if (!existingCourse) {
    throw new AppError(
      "Course not found",
      404
    );
  }

  const exam =
    await Exam.create({
      title,
      course,
      description,
      totalMarks,
      passingMarks,
      examDate,
      durationMinutes,
      status,
      createdBy,
    });

  return exam;
};

/**
 * Get All Exams
 */
const getAllExams =
  async () => {
    return Exam.find()
      .populate(
        "course",
        "title slug"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Get Exam By Id
 */
const getExamById =
  async (examId) => {
    const exam =
      await Exam.findById(examId)
        .populate(
          "course",
          "title slug"
        );

    if (!exam) {
      throw new AppError(
        "Exam not found",
        404
      );
    }

    return exam;
  };

export default {
  createExam,
  getAllExams,
  getExamById,
};