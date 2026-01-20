"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const notification_model_js_1 = require("./notification.model.js");
const mailer_js_1 = require("../../utils/mailer.js");
const createNotification = async ({ userId, type, title, message, email, metadata, }) => {
    const notification = await notification_model_js_1.NotificationModel.create({
        recipientUserId: userId,
        type,
        title,
        message,
        metadata,
    });
    if (email) {
        try {
            await (0, mailer_js_1.sendEmail)({
                to: email,
                subject: title,
                html: `<p>${message}</p>`,
            });
        }
        catch (error) {
            console.error("Email notification failed to send:", error);
            // We don't throw here so the notification record still exists even if email fails
        }
    }
    return notification;
};
exports.createNotification = createNotification;
