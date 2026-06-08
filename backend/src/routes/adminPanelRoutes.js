import express from "express";
import adminPanelController from "../controllers/adminPanelController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Admin Panel Routes
 */

router.get(
  "/overview",
  protect,
  authorize("admin", "super_admin"),
  adminPanelController.getOverview
);

router.get(
  "/recent-users",
  protect,
  authorize("admin", "super_admin"),
  adminPanelController.getRecentUsers
);

router.get(
  "/recent-enrollments",
  protect,
  authorize("admin", "super_admin"),
  adminPanelController.getRecentEnrollments
);

router.get(
  "/recent-payments",
  protect,
  authorize("admin", "super_admin"),
  adminPanelController.getRecentPayments
);

export default router;