import express from "express";
import studentPortalController from "../controllers/studentPortalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Student Portal Routes
 */

router.get(
  "/dashboard",
  protect,
  authorize("student"),
  studentPortalController.getDashboard
);

router.get(
  "/courses",
  protect,
  authorize("student"),
  studentPortalController.getMyCourses
);

router.get(
  "/payments",
  protect,
  authorize("student"),
  studentPortalController.getMyPayments
);

router.get(
  "/results",
  protect,
  authorize("student"),
  studentPortalController.getMyResults
);

export default router; 