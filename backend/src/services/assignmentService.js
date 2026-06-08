import Assignment from "../models/Assignment.js";
import AppError from "../utils/AppError.js";

/**
 * Create Assignment
 */
const createAssignment = async (
  assignmentData,
  teacherId
) => {
  const assignment =
    await Assignment.create({
      ...assignmentData,
      teacher: teacherId,
    });

  return assignment;
};

/**
 * Get All Assignments
 */
const getAllAssignments =
  async () => {
    return Assignment.find()
      .populate(
        "course",
        "title slug"
      )
      .populate(
        "teacher",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });
  };

/**
 * Get Assignment By ID
 */
const getAssignmentById =
  async (assignmentId) => {
    const assignment =
      await Assignment.findById(
        assignmentId
      )
        .populate(
          "course",
          "title slug"
        )
        .populate(
          "teacher",
          "fullName email"
        );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  };

/**
 * Update Assignment
 */
const updateAssignment =
  async (
    assignmentId,
    updateData
  ) => {
    const assignment =
      await Assignment.findByIdAndUpdate(
        assignmentId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!assignment) {
      throw new AppError(
        "Assignment not found",
        404
      );
    }

    return assignment;
  };

/**
 * Delete Assignment
 */
const deleteAssignment =
  async (assignmentId) => {
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

    await assignment.deleteOne();

    return true;
  };

export default {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};