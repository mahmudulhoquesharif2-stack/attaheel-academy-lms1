import express from "express";
import authController from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes (require valid JWT)
router.post("/logout", protect, authController.logout);
router.get("/profile", protect, authController.getProfile);

export default router;
