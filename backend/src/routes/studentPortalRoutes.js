import express from "express";
import studentPortalController from "../controllers/studentPortalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Student Portal Routes
 */

router.get(
  "/dashboard",
  protect,
  studentPortalController.getDashboard
);

router.get(
  "/courses",
  protect,
  studentPortalController.getMyCourses
);

router.get(
  "/payments",
  protect,
  studentPortalController.getMyPayments
);

router.get(
  "/results",
  protect,
  studentPortalController.getMyResults
);

export default router;