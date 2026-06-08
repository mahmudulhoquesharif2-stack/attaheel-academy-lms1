import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    enrollmentDate: {
      type: Date,
      default: Date.now,
    },

    batch: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
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

enrollmentSchema.index(
  {
    student: 1,
    course: 1,
  },
  {
    unique: true,
  }
);

const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;