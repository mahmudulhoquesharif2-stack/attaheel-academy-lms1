import activityService from "../services/activityService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

/**
 * POST /api/v1/activities
 */
const createActivity =
  asyncHandler(async (req, res) => {
    const activity =
      await activityService.createActivity(
        req.body
      );

    sendSuccess(
      res,
      201,
      "Activity created successfully",
      activity
    );
  });

/**
 * GET /api/v1/activities
 */
const getRecentActivities =
  asyncHandler(async (req, res) => {
    const limit =
      Number(
        req.query.limit
      ) || 20;

    const visibility =
      req.query.visibility ||
      "admin";

    const activities =
      await activityService.getRecentActivities(
        limit,
        visibility
      );

    sendSuccess(
      res,
      200,
      "Activities fetched successfully",
      activities
    );
  });

/**
 * GET /api/v1/activities/:id
 */
const getActivityById =
  asyncHandler(async (req, res) => {
    const activity =
      await activityService.getActivityById(
        req.params.id
      );

    sendSuccess(
      res,
      200,
      "Activity fetched successfully",
      activity
    );
  });

/**
 * DELETE /api/v1/activities/:id
 */
const deleteActivity =
  asyncHandler(async (req, res) => {
    await activityService.deleteActivity(
      req.params.id
    );

    sendSuccess(
      res,
      200,
      "Activity deleted successfully",
      null
    );
  });

export default {
  createActivity,
  getRecentActivities,
  getActivityById,
  deleteActivity,
};