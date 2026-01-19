import { Schema, model, Types } from "mongoose";
import { EscrowStatus } from "./escrow.types";

const EscrowSchema = new Schema(
  {
    orderId: {
      type: Types.ObjectId,
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
      enum: Object.values(EscrowStatus),
      default: EscrowStatus.HELD,
    },
  },
  { timestamps: true }
);

export const EscrowModel = model("Escrow", EscrowSchema);
