import express from "express";
import analyticsController from "../controllers/analyticsController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * GET /api/v1/analytics
 * Admin Analytics
 */
router.get(
  "/",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  analyticsController.getAnalytics
);

export default router;