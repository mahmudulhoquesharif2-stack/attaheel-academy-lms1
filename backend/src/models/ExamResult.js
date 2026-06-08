import mongoose from "mongoose";

const examResultSchema =
  new mongoose.Schema(
    {
      exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
      },

      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      marksObtained: {
        type: Number,
        required: true,
      },

      grade: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "passed",
          "failed",
        ],
      },

      remarks: {
        type: String,
        default: "",
      },

      publishedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

examResultSchema.index(
  {
    exam: 1,
    student: 1,
  },
  {
    unique: true,
  }
);

const ExamResult = mongoose.model(
  "ExamResult",
  examResultSchema
);

export default ExamResult;