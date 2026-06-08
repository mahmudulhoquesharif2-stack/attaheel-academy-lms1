import express from "express";
import paymentController from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Student Routes
 */

router.post(
  "/",
  protect,
  paymentController.createPayment
);

router.get(
  "/my-payments",
  protect,
  paymentController.getMyPayments
);

/**
 * Admin Routes
 */

router.get(
  "/",
  protect,
  authorize("admin", "super_admin"),
  paymentController.getAllPayments
);

router.patch(
  "/:id/approve",
  protect,
  authorize("admin", "super_admin"),
  paymentController.approvePayment
);

router.patch(
  "/:id/reject",
  protect,
  authorize("admin", "super_admin"),
  paymentController.rejectPayment
);

export default router;