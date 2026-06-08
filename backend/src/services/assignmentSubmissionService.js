import AssignmentSubmission from "../models/AssignmentSubmission.js";
import Assignment from "../models/Assignment.js";
import AppError from "../utils/AppError.js";

/**
 * Submit Assignment
 */
const submitAssignment = async (
  studentId,
  submissionData
) => {
  const {
    assignmentId,
    submissionText,
    attachmentUrl,
  } = submissionData;

  const assignment =
    await Assignment.findById(
      assignmentId
    );

  if (!assignment) {
    throw new AppError(
      "Assignment not found",
      404
    );
  }

  const existingSubmission =
    await AssignmentSubmission.findOne({
      assignment: assignmentId,
      student: studentId,
    });

  if (existingSubmission) {
    throw new AppError(
      "Assignment already submitted",
      400
    );
  }

  const submission =
    await AssignmentSubmission.create({
      assignment: assignmentId,
      student: studentId,
      submissionText,
      attachmentUrl,
    });

  return submission;
};

/**
 * Student Submissions
 */
const getMySubmissions =
  async (studentId) => {
    return AssignmentSubmission.find({
      student: studentId,
    })
      .populate(
        "assignment",
        "title dueDate"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Assignment Submissions
 */
const getAssignmentSubmissions =
  async (assignmentId) => {
    return AssignmentSubmission.find({
      assignment: assignmentId,
    })
      .populate(
        "student",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Grade Submission
 */
const gradeSubmission = async (
  submissionId,
  gradeData
) => {
  const {
    marks,
    feedback,
  } = gradeData;

  const submission =
    await AssignmentSubmission.findById(
      submissionId
    );

  if (!submission) {
    throw new AppError(
      "Submission not found",
      404
    );
  }

  submission.marks = marks;
  submission.feedback = feedback;
  submission.status = "graded";
  submission.gradedAt =
    new Date();

  await submission.save();

  return submission;
};

export default {
  submitAssignment,
  getMySubmissions,
  getAssignmentSubmissions,
  gradeSubmission,
};