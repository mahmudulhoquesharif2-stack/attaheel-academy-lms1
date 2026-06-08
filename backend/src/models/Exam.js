import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    passingMarks: {
      type: Number,
      required: true,
    },

    examDate: {
      type: Date,
      required: true,
    },

    durationMinutes: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "completed",
      ],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model(
  "Exam",
  examSchema
);

export default Exam;