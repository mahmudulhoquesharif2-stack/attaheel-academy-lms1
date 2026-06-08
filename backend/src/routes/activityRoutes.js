import express from "express";

import activityController from "../controllers/activityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * ADMIN ONLY
 */

router.post(
  "/",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  activityController.createActivity
);

router.get(
  "/",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  activityController.getRecentActivities
);

router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  activityController.getActivityById
);

router.delete(
  "/:id",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  activityController.deleteActivity
);

export default router;