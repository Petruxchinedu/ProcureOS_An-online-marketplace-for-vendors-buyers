import { NotificationModel } from "./notification.model";
import { NotificationType } from "./notification.types";
import { sendEmail } from "../../utils/mailer";
import { createNotification } from "../notification/notification.service";
import { NotificationType } from "../notification/notification.types";
import { UserModel } from "../users/user.model";

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
