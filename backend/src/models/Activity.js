import mongoose from "mongoose";

const activitySchema =
  new mongoose.Schema(
    {
      actor: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      action: {
        type: String,
        required: true,
        trim: true,
      },

      entityType: {
        type: String,
        enum: [
          "user",
          "course",
          "enrollment",
          "payment",
          "system",
        ],
        required: true,
      },

      entityId: {
        type:
          mongoose.Schema.Types.ObjectId,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      metadata: {
        type: Object,
        default: {},
      },

      visibility: {
        type: String,
        enum: [
          "public",
          "admin",
          "private",
        ],
        default: "admin",
      },
    },
    {
      timestamps: true,
    }
  );

activitySchema.index({
  createdAt: -1,
});

const Activity =
  mongoose.model(
    "Activity",
    activitySchema
  );

export default Activity;