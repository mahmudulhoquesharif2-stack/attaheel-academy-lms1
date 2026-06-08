import dashboardService from "../services/dashboardService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

const getDashboardStats = asyncHandler(
  async (req, res) => {
    const stats =
      await dashboardService.getDashboardStats();

    sendSuccess(
      res,
      200,
      "Dashboard statistics fetched successfully",
      stats
    );
  }
);

export default {
  getDashboardStats,
};