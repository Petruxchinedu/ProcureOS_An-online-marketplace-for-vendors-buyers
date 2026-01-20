"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrowModel = void 0;
const mongoose_1 = require("mongoose");
const escrow_types_js_1 = require("./escrow.types.js");
const EscrowSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Order",
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(escrow_types_js_1.EscrowStatus),
        default: escrow_types_js_1.EscrowStatus.HELD,
    },
}, { timestamps: true });
exports.EscrowModel = (0, mongoose_1.model)("Escrow", EscrowSchema);
