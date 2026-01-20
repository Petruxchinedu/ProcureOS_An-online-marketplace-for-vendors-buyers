"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegotiationMessageModel = void 0;
const mongoose_1 = require("mongoose");
const negotiation_types_js_1 = require("./negotiation.types.js");
const NegotiationMessageSchema = new mongoose_1.Schema({
    rfqId: {
        type: mongoose_1.Types.ObjectId,
        ref: "RFQ",
        required: true,
        index: true,
    },
    senderId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderRole: {
        type: String,
        enum: Object.values(negotiation_types_js_1.MessageSenderRole),
        required: true,
    },
    message: {
        type: String,
    },
    proposedUnitPrice: {
        type: Number,
    },
}, { timestamps: true });
exports.NegotiationMessageModel = (0, mongoose_1.model)("NegotiationMessage", NegotiationMessageSchema);
