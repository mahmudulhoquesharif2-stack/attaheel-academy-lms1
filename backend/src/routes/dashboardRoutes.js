import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * GET /api/v1/dashboard/stats
 * Admin Dashboard Statistics
 */
router.get(
  "/stats",
  protect,
  authorize("admin", "super_admin"),
  dashboardController.getDashboardStats
);

export default router;