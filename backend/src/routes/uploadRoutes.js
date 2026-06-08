import express from "express";
import uploadController from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Upload File
 */

router.post(
  "/",
  protect,
  authorize(
    "teacher",
    "admin",
    "super_admin"
  ),
  uploadController.uploadFile
);

/**
 * Delete File
 */

router.delete(
  "/:publicId",
  protect,
  authorize(
    "admin",
    "super_admin"
  ),
  uploadController.deleteFile
);

export default router;