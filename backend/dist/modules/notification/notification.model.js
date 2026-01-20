"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notification_types_js_1 = require("./notification.types.js");
const NotificationSchema = new mongoose_1.Schema({
    recipientUserId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: Object.values(notification_types_js_1.NotificationType),
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
}, { timestamps: true });
exports.NotificationModel = (0, mongoose_1.model)("Notification", NotificationSchema);
