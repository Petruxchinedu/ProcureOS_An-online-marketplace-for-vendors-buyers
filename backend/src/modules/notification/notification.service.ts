import { NotificationModel } from "./notification.model.js";
import { NotificationType } from "./notification.types.js";
import { sendEmail } from "../../utils/mailer.js";
// REMOVED: import { createNotification } from "./notification.service.js";
import { UserModel } from "../users/user.model.js";

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  email?: string;
  metadata?: Record<string, any>;
}

export const createNotification = async ({
  userId,
  type,
  title,
  message,
  email,
  metadata,
}: CreateNotificationInput) => {
  const notification = await NotificationModel.create({
    recipientUserId: userId,
    type,
    title,
    message,
    metadata,
  });

  if (email) {
    try {
      await sendEmail({
        to: email,
        subject: title,
        html: `<p>${message}</p>`,
      });
    } catch (error) {
      console.error("Email notification failed to send:", error);
      // We don't throw here so the notification record still exists even if email fails
    }
  }

  return notification;
};