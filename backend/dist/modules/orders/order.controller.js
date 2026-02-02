"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceByRFQId = exports.getInvoice = exports.markOrderFulfilled = exports.createOrderFromRFQ = void 0;
const order_model_js_1 = require("./order.model.js");
const rfq_model_js_1 = __importDefault(require("../rfq/rfq.model.js"));
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
    if (!req.user?.organizationId) {
        return res.status(403).json({ message: "Organization context required" });
    }
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
    if (!req.user?.organizationId) {
        return res.status(403).json({ message: "Organization context required" });
    }
    const order = await order_model_js_1.OrderModel.findById(orderId);
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    if (order.vendorOrganizationId !== req.user.organizationId) {
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
/**
 * Get invoice for order
 */
const getInvoice = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const { orderId } = req.params;
        const order = await order_model_js_1.OrderModel.findById(orderId)
            .populate("buyerId", "name email")
            .populate("vendorId", "name email")
            .populate("productId", "name");
        if (!order) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        const invoice = {
            invoiceNumber: `INV-${order._id.toString().slice(-6).toUpperCase()}`,
            issuedAt: new Date(),
            vendor: order.vendorId,
            buyer: order.buyerId,
            product: order.productId,
            quantity: order.quantity,
            unitPrice: order.unitPrice,
            total: order.totalAmount,
            status: order.status,
        };
        return res.status(200).json(invoice);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getInvoice = getInvoice;
/**
 * Generate invoice for an accepted RFQ/Order
 */
const getInvoiceByRFQId = async (req, res) => {
    try {
        const { rfqId } = req.params;
        const vendorId = req.user.userId;
        console.log("📄 Generating invoice for RFQ:", rfqId);
        // 1. Find the RFQ
        const rfq = await rfq_model_js_1.default.findById(rfqId)
            .populate("productId", "name description category")
            .populate("buyerId", "email organizationName")
            .populate("vendorId", "email organizationName");
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        // 2. Verify vendor owns this RFQ
        if (rfq.vendorId._id.toString() !== vendorId) {
            return res.status(403).json({ message: "Unauthorized: Not your RFQ" });
        }
        // 3. Check if RFQ is accepted
        if (rfq.status !== "ACCEPTED") {
            return res.status(400).json({
                message: "Cannot generate invoice. RFQ must be accepted first."
            });
        }
        // 4. Find or create order
        let order = await order_model_js_1.OrderModel.findOne({ rfqId: rfq._id });
        if (!order) {
            // Create order if it doesn't exist
            order = await order_model_js_1.OrderModel.create({
                rfqId: rfq._id,
                buyerId: rfq.buyerId,
                vendorId: rfq.vendorId,
                productId: rfq.productId,
                quantity: rfq.quantity,
                unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
                totalAmount: rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice),
                status: "PENDING"
            });
        }
        // 5. Generate invoice number
        const invoiceNumber = `INV-${Date.now()}-${rfq._id.toString().slice(-6).toUpperCase()}`;
        // 6. Calculate amounts
        const subtotal = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice);
        const platformFee = subtotal * 0.02; // 2% platform fee
        const total = subtotal;
        const netRevenue = subtotal - platformFee;
        // 7. Build invoice response
        const invoice = {
            invoiceNumber,
            rfqId: rfq._id,
            orderId: order._id,
            status: "PAID", // or order.status
            issuedAt: order.createdAt,
            // Parties
            vendor: {
                id: rfq.vendorId._id,
                name: rfq.vendorId.organizationName || rfq.vendorId.email,
                email: rfq.vendorId.email
            },
            buyer: {
                id: rfq.buyerId._id,
                name: rfq.buyerId.organizationName || rfq.buyerId.email,
                email: rfq.buyerId.email,
                organizationName: rfq.buyerId.organizationName
            },
            // Product details
            product: {
                id: rfq.productId._id,
                name: rfq.productId.name,
                description: rfq.productId.description,
                category: rfq.productId.category
            },
            // Amounts
            quantity: rfq.quantity,
            unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
            subtotal,
            platformFee,
            total,
            netRevenue,
            // Metadata
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
        console.log("✅ Invoice generated successfully");
        return res.status(200).json(invoice);
    }
    catch (error) {
        console.error("❌ getInvoiceByRFQId Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getInvoiceByRFQId = getInvoiceByRFQId;
