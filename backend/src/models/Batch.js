import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    batchType: {
      type: String,
      enum: ["madrasa", "general"],
      required: true,
    },

    days: [
      {
        type: String,
      },
    ],

    classTime: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model(
  "Batch",
  batchSchema
);

export default Batch;