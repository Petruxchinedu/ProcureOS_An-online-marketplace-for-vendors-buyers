import { Schema, model, Types } from "mongoose";
import { MessageSenderRole } from "./negotiation.types.js";

const NegotiationMessageSchema = new Schema(
  {
    rfqId: {
      type: Types.ObjectId,
      ref: "RFQ",
      required: true,
      index: true,
    },

    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderRole: {
      type: String,
      enum: Object.values(MessageSenderRole),
      required: true,
    },

    message: {
      type: String,
    },

    proposedUnitPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const NegotiationMessageModel = model(
  "NegotiationMessage",
  NegotiationMessageSchema
);
