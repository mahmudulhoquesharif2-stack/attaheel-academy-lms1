import express from "express";
import courseController from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes — only published courses are returned
router.get("/", courseController.getAllCourses);
router.get("/:slug", courseController.getCourseBySlug);

// Admin routes
router.post(
  "/",
  protect,
  authorize("admin", "super_admin"),
  courseController.createCourse
);

export default router;
