import express from "express";
import batchController from "../controllers/batchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin", "super_admin"),
  batchController.createBatch
);

router.get(
  "/",
  protect,
  batchController.getAllBatches
);

export default router;