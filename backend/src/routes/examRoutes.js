import express from "express";
import examController from "../controllers/examController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Public Routes
 */

router.get(
  "/",
  examController.getAllExams
);

router.get(
  "/:id",
  examController.getExamById
);

/**
 * Teacher / Admin Routes
 */

router.post(
  "/",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  examController.createExam
);

export default router;