import express from "express";
import examResultController from "../controllers/examResultController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Student Routes
 */

router.get(
  "/my-results",
  protect,
  examResultController.getMyResults
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
  examResultController.publishResult
);

router.get(
  "/exam/:id",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  examResultController.getExamResults
);

export default router;