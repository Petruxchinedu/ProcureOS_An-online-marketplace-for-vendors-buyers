"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const order_types_js_1 = require("./order.types.js");
const OrderSchema = new mongoose_1.Schema({
    rfqId: {
        type: mongoose_1.Types.ObjectId,
        ref: "RFQ",
        required: true,
        index: true,
    },
    productId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    buyerOrganizationId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Organization",
        required: true,
        index: true,
    },
    vendorOrganizationId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Organization",
        required: true,
        index: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(order_types_js_1.OrderStatus),
        default: order_types_js_1.OrderStatus.CREATED,
    },
    escrowId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Escrow",
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
