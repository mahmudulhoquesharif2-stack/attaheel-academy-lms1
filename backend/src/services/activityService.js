import Activity from "../models/Activity.js";
import AppError from "../utils/AppError.js";

/**
 * Create Activity
 */
const createActivity = async (
  activityData
) => {
  const activity =
    await Activity.create(
      activityData
    );

  return activity;
};

/**
 * Get Recent Activities
 */
const getRecentActivities =
  async (
    limit = 20,
    visibility = "admin"
  ) => {
    const activities =
      await Activity.find({
        visibility,
      })
        .populate(
          "actor",
          "fullName role"
        )
        .sort({
          createdAt: -1,
        })
        .limit(limit);

    return activities;
  };

/**
 * Get Activity By ID
 */
const getActivityById =
  async (id) => {
    const activity =
      await Activity.findById(
        id
      ).populate(
        "actor",
        "fullName email"
      );

    if (!activity) {
      throw new AppError(
        "Activity not found",
        404
      );
    }

    return activity;
  };

/**
 * Delete Activity
 */
const deleteActivity =
  async (id) => {
    const activity =
      await Activity.findById(
        id
      );

    if (!activity) {
      throw new AppError(
        "Activity not found",
        404
      );
    }

    await activity.deleteOne();

    return true;
  };

export default {
  createActivity,
  getRecentActivities,
  getActivityById,
  deleteActivity,
};