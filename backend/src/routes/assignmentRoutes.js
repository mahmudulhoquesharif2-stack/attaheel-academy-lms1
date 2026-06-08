import express from "express";
import assignmentController from "../controllers/assignmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Public Routes
 */

router.get(
  "/",
  assignmentController.getAllAssignments
);

router.get(
  "/:id",
  assignmentController.getAssignmentById
);

/**
 * Admin / Teacher Routes
 */

router.post(
  "/",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  assignmentController.createAssignment
);

router.put(
  "/:id",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  assignmentController.updateAssignment
);

router.delete(
  "/:id",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  assignmentController.deleteAssignment
);

export default router;