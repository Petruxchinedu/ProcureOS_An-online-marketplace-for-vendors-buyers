import { NotificationModel } from "./notification.model.js";
import { NotificationType } from "./notification.types.js";
import { sendEmail } from "../../utils/mailer.js";
import { createNotification } from "./notification.service.js"; // Note: removed redundant folder jump if you're already in notification folder
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
    await sendEmail({
      to: email,
      subject: title,
      html: `<p>${message}</p>`,
    });
  }

  return notification;
};
