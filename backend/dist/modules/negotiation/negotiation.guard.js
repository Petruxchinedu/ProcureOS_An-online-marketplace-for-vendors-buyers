"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRFQParticipant = void 0;
const rfq_model_js_1 = __importDefault(require("../rfq/rfq.model.js"));
const assertRFQParticipant = async (rfqId, organizationId) => {
    const rfq = await rfq_model_js_1.default.findById(rfqId);
    if (!rfq) {
        throw new Error("RFQ not found");
    }
    const isParticipant = rfq.buyerOrganizationId.toString() === organizationId ||
        rfq.vendorOrganizationId.toString() === organizationId;
    if (!isParticipant) {
        throw new Error("Access denied to this RFQ");
    }
    return rfq;
};
exports.assertRFQParticipant = assertRFQParticipant;
