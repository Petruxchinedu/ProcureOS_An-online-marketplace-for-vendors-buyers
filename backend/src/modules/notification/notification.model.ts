import { Schema, model, Types } from "mongoose";
import { NotificationType } from "./notification.types";

const NotificationSchema = new Schema(
  {
    recipientUserId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

export const NotificationModel = model(
  "Notification",
  NotificationSchema
);
