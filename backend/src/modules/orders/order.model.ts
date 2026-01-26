import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  rfqId: Types.ObjectId;
  productId: Types.ObjectId;
  buyerId: string;
  vendorId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: "CREATED" | "CONFIRMED" | "PAID" | "FULFILLED";
  buyerOrganizationId?: string;
  vendorOrganizationId?: string;
  escrowId?: Types.ObjectId;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    rfqId: { type: Schema.Types.ObjectId, ref: "RFQ", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    buyerId: { type: String, required: true },
    vendorId: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["CREATED","CONFIRMED","PAID","FULFILLED"], default: "CREATED" },
    buyerOrganizationId: { type: String },
    vendorOrganizationId: { type: String },
    escrowId: { type: Schema.Types.ObjectId, ref: "Escrow" },
    createdBy: { type: String },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
