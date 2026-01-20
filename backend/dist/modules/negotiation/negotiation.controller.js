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
 * Send message in negotiation
 */
const sendNegotiationMessage = async (req, res) => {
    // Cast param to string to avoid "string | string[]" errors
    const rfqId = req.params.rfqId;
    // Add "!" after req.user to tell TS it is defined by your middleware
    const rfq = await (0, negotiation_guard_js_1.assertRFQParticipant)(rfqId, req.user.organizationId);
    const senderRole = rfq.buyerOrganizationId.toString() === req.user.organizationId
        ? negotiation_types_js_1.MessageSenderRole.BUYER
        : negotiation_types_js_1.MessageSenderRole.VENDOR;
    const messageRecord = await negotiation_model_js_1.NegotiationMessageModel.create({
        rfqId,
        senderId: req.user.userId, // Added "!" here
        senderRole,
        message: req.body.message,
        proposedUnitPrice: req.body.proposedUnitPrice,
    });
    const recipientOrgId = senderRole === negotiation_types_js_1.MessageSenderRole.BUYER
        ? rfq.vendorOrganizationId
        : rfq.buyerOrganizationId;
    const recipientUser = await user_model_js_1.UserModel.findOne({
        organizationId: recipientOrgId,
    });
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
};
exports.sendNegotiationMessage = sendNegotiationMessage;
/**
 * Get negotiation thread for RFQ
 */
const getNegotiationThread = async (req, res) => {
    const rfqId = req.params.rfqId; // Cast to string
    // Added "!" to req.user
    await (0, negotiation_guard_js_1.assertRFQParticipant)(rfqId, req.user.organizationId);
    const messages = await negotiation_model_js_1.NegotiationMessageModel.find({ rfqId })
        .sort({ createdAt: 1 })
        .populate("senderId", "email role");
    return res.status(200).json(messages);
};
exports.getNegotiationThread = getNegotiationThread;
