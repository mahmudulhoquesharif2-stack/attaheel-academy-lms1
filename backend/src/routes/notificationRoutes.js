import express from "express";
import notificationController from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Student Routes
 */

router.get(
  "/my-notifications",
  protect,
  notificationController.getMyNotifications
);

router.patch(
  "/:id/read",
  protect,
  notificationController.markAsRead
);

router.delete(
  "/:id",
  protect,
  notificationController.deleteNotification
);

/**
 * Admin Routes
 */

router.post(
  "/",
  protect,
  authorize("admin", "super_admin"),
  notificationController.createNotification
);

export default router;