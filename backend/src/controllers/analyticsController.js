import analyticsService from "../services/analyticsService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

const getAnalytics = asyncHandler(
  async (req, res) => {
    const analytics =
      await analyticsService.getAnalytics();

    sendSuccess(
      res,
      200,
      "Analytics fetched successfully",
      analytics
    );
  }
);

export default {
  getAnalytics,
};