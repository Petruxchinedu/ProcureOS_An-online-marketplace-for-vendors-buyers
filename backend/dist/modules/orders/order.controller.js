"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markOrderFulfilled = exports.createOrderFromRFQ = void 0;
const rfq_model_js_1 = __importDefault(require("../rfq/rfq.model.js"));
const order_model_js_1 = require("./order.model.js");
const escrow_model_js_1 = require("../escrow/escrow.model.js");
const rfq_types_js_1 = require("../rfq/rfq.types.js");
const order_types_js_1 = require("./order.types.js");
const user_model_js_1 = require("../users/user.model.js");
const notification_service_js_1 = require("../notification/notification.service.js");
const notification_types_js_1 = require("../notification/notification.types.js");
/**
 * Buyer accepts RFQ → creates order
 */
const createOrderFromRFQ = async (req, res) => {
    const { rfqId } = req.params;
    const { unitPrice } = req.body;
    const rfq = await rfq_model_js_1.default.findById(rfqId);
    if (!rfq)
        return res.status(404).json({ message: "RFQ not found" });
    if (rfq.buyerOrganizationId.toString() !== req.user.organizationId) {
        return res.status(403).json({ message: "Access denied" });
    }
    if (![rfq_types_js_1.RFQStatus.SUBMITTED, rfq_types_js_1.RFQStatus.RESPONDED].includes(rfq.status)) {
        return res.status(400).json({ message: "RFQ cannot be accepted" });
    }
    const totalAmount = rfq.quantity * unitPrice;
    const order = await order_model_js_1.OrderModel.create({
        rfqId: rfq._id,
        productId: rfq.productId,
        buyerOrganizationId: rfq.buyerOrganizationId,
        vendorOrganizationId: rfq.vendorOrganizationId,
        quantity: rfq.quantity,
        unitPrice,
        totalAmount,
        status: order_types_js_1.OrderStatus.CREATED,
        createdBy: req.user.userId,
    });
    const escrow = await escrow_model_js_1.EscrowModel.create({
        orderId: order._id,
        amount: totalAmount,
        status: "HELD",
    });
    order.escrowId = escrow._id;
    await order.save();
    rfq.status = rfq_types_js_1.RFQStatus.ACCEPTED;
    await rfq.save();
    return res.status(201).json({ order, escrow });
};
exports.createOrderFromRFQ = createOrderFromRFQ;
/**
 * Vendor marks order as fulfilled
 */
const markOrderFulfilled = async (req, res) => {
    const { orderId } = req.params;
    const order = await order_model_js_1.OrderModel.findById(orderId);
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    if (order.vendorOrganizationId.toString() !== req.user.organizationId) {
        return res.status(403).json({ message: "Access denied" });
    }
    order.status = order_types_js_1.OrderStatus.FULFILLED;
    await order.save();
    const buyerUser = await user_model_js_1.UserModel.findOne({
        organizationId: order.buyerOrganizationId,
    });
    if (buyerUser) {
        await (0, notification_service_js_1.createNotification)({
            userId: buyerUser._id.toString(),
            type: notification_types_js_1.NotificationType.ORDER_FULFILLED,
            title: "Order Fulfilled",
            message: "Your order has been fulfilled by the vendor.",
            email: buyerUser.email,
            metadata: { orderId: order._id },
        });
    }
    return res.status(200).json(order);
};
exports.markOrderFulfilled = markOrderFulfilled;
