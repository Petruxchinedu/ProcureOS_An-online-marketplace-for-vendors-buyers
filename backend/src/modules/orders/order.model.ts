import { Schema, model, Types } from "mongoose";

export enum OrderStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

const OrderSchema = new Schema(
  {
    rfqId: {
      type: Types.ObjectId,
      ref: "RFQ",
      required: true,
      unique: true // 🔒 prevents duplicate orders
    },
    buyerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    vendorId: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true
    },
    
 buyerOrganizationId: {
      type: Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },

    vendorOrganizationId: {
      type: Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING_PAYMENT
    },
    delivery: {
      carrier: String,
      trackingNumber: String,
      estimatedDelivery: Date
    }
  },
  { timestamps: true }
);

export const Order = model("Order", OrderSchema);
