import mongoose, { Schema, Document } from "mongoose";

export interface IRFQ extends Document {
  productId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  quantity: number;
  targetUnitPrice?: number;
  message: string;
  status: "PENDING" | "NEGOTIATING" | "ACCEPTED" | "REJECTED" | "CLOSED";
  createdAt: Date;
  updatedAt: Date;
}

const RFQSchema: Schema = new Schema(
  {
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    buyerId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    vendorId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", // Or "Organization" depending on your setup
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: [1, "Quantity cannot be less than 1"] 
    },
    targetUnitPrice: { 
      type: Number 
    },
    message: { 
      type: String, 
      required: [true, "Please provide details for your request"],
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: ["PENDING", "NEGOTIATING", "ACCEPTED", "REJECTED", "CLOSED"],
      default: "PENDING",
    },
  },
  { 
    timestamps: true // Automatically handles createdAt and updatedAt
  }
);

// Indexing for faster lookups (Senior Dev Practice)
RFQSchema.index({ buyerId: 1, createdAt: -1 });
RFQSchema.index({ vendorId: 1, createdAt: -1 });

const RFQ = mongoose.models.RFQ || mongoose.model<IRFQ>("RFQ", RFQSchema);
export default RFQ;