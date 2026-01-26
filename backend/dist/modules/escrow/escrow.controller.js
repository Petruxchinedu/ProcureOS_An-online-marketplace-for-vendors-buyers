"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDeliveryAndReleaseEscrow = void 0;
const order_model_js_1 = require("../orders/order.model.js");
const escrow_model_js_1 = require("./escrow.model.js");
const order_types_js_1 = require("../orders/order.types.js");
const escrow_types_js_1 = require("./escrow.types.js");
const user_model_1 = require("../users/user.model");
const notification_service_js_1 = require("../notification/notification.service.js");
const notification_types_js_1 = require("../notification/notification.types.js");
/**
 * Buyer confirms delivery → releases escrow
 */
const confirmDeliveryAndReleaseEscrow = async (req, res) => {
    const { orderId } = req.params;
    const order = await order_model_js_1.OrderModel.findById(orderId);
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    if (order.buyerOrganizationId?.toString() !== req.user.organizationId) {
        return res.status(403).json({ message: "Access denied" });
    }
    if (order.status !== order_types_js_1.OrderStatus.FULFILLED) {
        return res.status(400).json({
            message: "Order must be fulfilled before confirmation",
        });
    }
    const escrow = await escrow_model_js_1.EscrowModel.findById(order.escrowId);
    if (!escrow)
        return res.status(404).json({ message: "Escrow record not found" });
    if (escrow.status !== escrow_types_js_1.EscrowStatus.HELD) {
        return res.status(400).json({ message: "Escrow already processed" });
    }
    /**
     * STATE TRANSITIONS (Atomic)
     */
    escrow.status = escrow_types_js_1.EscrowStatus.RELEASED;
    order.status = "FULFILLED";
    await escrow.save();
    await order.save();
    const vendorUser = await user_model_1.UserModel.findOne({
        organizationId: order.vendorOrganizationId,
    });
    if (vendorUser) {
        await (0, notification_service_js_1.createNotification)({
            userId: vendorUser._id.toString(),
            type: notification_types_js_1.NotificationType.ESCROW_RELEASED,
            title: "Payment Released",
            message: "Escrow funds have been released to your account.",
            email: vendorUser.email,
            metadata: { orderId: order._id },
        });
    }
    return res.status(200).json({
        message: "Delivery confirmed. Escrow released to vendor.",
        order,
        escrow,
    });
};
exports.confirmDeliveryAndReleaseEscrow = confirmDeliveryAndReleaseEscrow;
