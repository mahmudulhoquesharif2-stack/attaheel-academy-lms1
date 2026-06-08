import express from "express";
import assignmentSubmissionController from "../controllers/assignmentSubmissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Student Routes
 */

router.post(
  "/",
  protect,
  assignmentSubmissionController.submitAssignment
);

router.get(
  "/my-submissions",
  protect,
  assignmentSubmissionController.getMySubmissions
);

/**
 * Teacher / Admin Routes
 */

router.get(
  "/assignment/:id",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  assignmentSubmissionController.getAssignmentSubmissions
);

router.patch(
  "/:id/grade",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  assignmentSubmissionController.gradeSubmission
);

export default router;