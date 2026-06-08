import Notification from "../models/Notification.js";
import AppError from "../utils/AppError.js";

/**
 * Create Notification
 */
const createNotification = async (
  notificationData,
  createdBy
) => {
  const notification =
    await Notification.create({
      ...notificationData,
      createdBy,
    });

  return notification;
};

/**
 * My Notifications
 */
const getMyNotifications =
  async (userId) => {
    return Notification.find({
      recipient: userId,
    }).sort({
      createdAt: -1,
    });
  };

/**
 * Mark As Read
 */
const markAsRead = async (
  notificationId,
  userId
) => {
  const notification =
    await Notification.findOne({
      _id: notificationId,
      recipient: userId,
    });

  if (!notification) {
    throw new AppError(
      "Notification not found",
      404
    );
  }

  notification.isRead = true;
  notification.readAt = new Date();

  await notification.save();

  return notification;
};

/**
 * Delete Notification
 */
const deleteNotification =
  async (
    notificationId,
    userId
  ) => {
    const notification =
      await Notification.findOne({
        _id: notificationId,
        recipient: userId,
      });

    if (!notification) {
      throw new AppError(
        "Notification not found",
        404
      );
    }

    await notification.deleteOne();

    return true;
  };

export default {
  createNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
};