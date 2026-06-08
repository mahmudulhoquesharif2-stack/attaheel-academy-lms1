import mongoose from "mongoose";

const assignmentSubmissionSchema =
  new mongoose.Schema(
    {
      assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
      },

      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      submissionText: {
        type: String,
        default: "",
      },

      attachmentUrl: {
        type: String,
        default: "",
      },

      marks: {
        type: Number,
        default: 0,
      },

      feedback: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "submitted",
          "reviewed",
          "graded",
        ],
        default: "submitted",
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },

      gradedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

assignmentSubmissionSchema.index(
  {
    assignment: 1,
    student: 1,
  },
  {
    unique: true,
  }
);

const AssignmentSubmission =
  mongoose.model(
    "AssignmentSubmission",
    assignmentSubmissionSchema
  );

export default AssignmentSubmission;