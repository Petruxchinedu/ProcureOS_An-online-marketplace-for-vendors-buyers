"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNegotiationThread = exports.sendNegotiationMessage = void 0;
const negotiation_model_js_1 = require("./negotiation.model.js");
const negotiation_types_js_1 = require("./negotiation.types.js");
const negotiation_guard_js_1 = require("./negotiation.guard.js");
const notification_service_js_1 = require("../notification/notification.service.js");
const notification_types_js_1 = require("../notification/notification.types.js");
const user_model_js_1 = require("../users/user.model.js");
/**
 * Send a negotiation message for a given RFQ
 */
const sendNegotiationMessage = async (req, res) => {
    try {
        const rfqId = req.params.rfqId;
        // 1️⃣ Guard: organization context
        if (!req.user?.organizationId) {
            return res.status(400).json({ message: "Organization context required" });
        }
        // 2️⃣ Ensure the user is a participant of the RFQ
        const rfq = await (0, negotiation_guard_js_1.assertRFQParticipant)(rfqId, req.user.organizationId);
        // 3️⃣ Determine sender role
        const senderRole = rfq.buyerOrganizationId.toString() === req.user.organizationId
            ? negotiation_types_js_1.MessageSenderRole.BUYER
            : negotiation_types_js_1.MessageSenderRole.VENDOR;
        // 4️⃣ Create negotiation message
        const messageRecord = await negotiation_model_js_1.NegotiationMessageModel.create({
            rfqId,
            senderId: req.user.userId,
            senderRole,
            message: req.body.message,
            proposedUnitPrice: req.body.proposedUnitPrice,
        });
        // 5️⃣ Determine recipient
        const recipientOrgId = senderRole === negotiation_types_js_1.MessageSenderRole.BUYER
            ? rfq.vendorOrganizationId
            : rfq.buyerOrganizationId;
        const recipientUser = await user_model_js_1.UserModel.findOne({ organizationId: recipientOrgId });
        // 6️⃣ Create notification for recipient
        if (recipientUser) {
            await (0, notification_service_js_1.createNotification)({
                userId: recipientUser._id.toString(),
                type: notification_types_js_1.NotificationType.NEGOTIATION_MESSAGE,
                title: "New Negotiation Message",
                message: "You have received a new negotiation message.",
                email: recipientUser.email,
                metadata: { rfqId },
            });
        }
        return res.status(201).json(messageRecord);
    }
    catch (error) {
        console.error("sendNegotiationMessage error:", error);
        return res.status(500).json({ message: "Failed to send negotiation message" });
    }
};
exports.sendNegotiationMessage = sendNegotiationMessage;
/**
 * Get negotiation thread (all messages) for a given RFQ
 */
const getNegotiationThread = async (req, res) => {
    try {
        const rfqId = req.params.rfqId;
        // 1️⃣ Guard: organization context
        if (!req.user?.organizationId) {
            return res.status(400).json({ message: "Organization context required" });
        }
        // 2️⃣ Ensure the user is a participant of the RFQ
        await (0, negotiation_guard_js_1.assertRFQParticipant)(rfqId, req.user.organizationId);
        // 3️⃣ Fetch messages, sorted by creation time
        const messages = await negotiation_model_js_1.NegotiationMessageModel.find({ rfqId })
            .sort({ createdAt: 1 })
            .populate("senderId", "email role");
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error("getNegotiationThread error:", error);
        return res.status(500).json({ message: "Failed to fetch negotiation thread" });
    }
};
exports.getNegotiationThread = getNegotiationThread;
