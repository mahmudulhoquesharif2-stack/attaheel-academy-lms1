import notificationService from "../services/notificationService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import AppError from "../utils/AppError.js";

/**
 * POST /api/v1/notifications
 */
const createNotification =
  asyncHandler(async (req, res) => {
    const {
      recipient,
      title,
      message,
      type,
    } = req.body;

    if (
      !recipient ||
      !title ||
      !message
    ) {
      throw new AppError(
        "Please provide recipient, title and message",
        400
      );
    }

    const notification =
      await notificationService.createNotification(
        {
          recipient,
          title,
          message,
          type,
        },
        req.user._id
      );

    sendSuccess(
      res,
      201,
      "Notification created successfully",
      notification
    );
  });

/**
 * GET /api/v1/notifications/my-notifications
 */
const getMyNotifications =
  asyncHandler(async (req, res) => {
    const notifications =
      await notificationService.getMyNotifications(
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Notifications fetched successfully",
      notifications
    );
  });

/**
 * PATCH /api/v1/notifications/:id/read
 */
const markAsRead =
  asyncHandler(async (req, res) => {
    const notification =
      await notificationService.markAsRead(
        req.params.id,
        req.user._id
      );

    sendSuccess(
      res,
      200,
      "Notification marked as read",
      notification
    );
  });

/**
 * DELETE /api/v1/notifications/:id
 */
const deleteNotification =
  asyncHandler(async (req, res) => {
    await notificationService.deleteNotification(
      req.params.id,
      req.user._id
    );

    sendSuccess(
      res,
      200,
      "Notification deleted successfully",
      null
    );
  });

export default {
  createNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
};