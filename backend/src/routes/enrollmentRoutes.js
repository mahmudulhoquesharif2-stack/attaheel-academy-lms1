import express from "express";
import enrollmentController from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  enrollmentController.createEnrollment
);

router.get(
  "/my-courses",
  protect,
  enrollmentController.getMyCourses
);

router.get(
  "/",
  protect,
  authorize("admin", "super_admin"),
  enrollmentController.getAllEnrollments
);

router.patch(
  "/:id/approve",
  protect,
  authorize("admin", "super_admin"),
  enrollmentController.approveEnrollment
);

router.patch(
  "/:id/reject",
  protect,
  authorize("admin", "super_admin"),
  enrollmentController.rejectEnrollment
);

export default router;