import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  pricePerUnit: number;
  minimumOrderQuantity: number;
  images?: string[];
  category?: string;
  vendorId: mongoose.Types.ObjectId;
  vendorOrganizationId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    pricePerUnit: { type: Number, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String },
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vendorOrganizationId: { 
      type: Schema.Types.ObjectId, 
      ref: "Organization" 
    }
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;