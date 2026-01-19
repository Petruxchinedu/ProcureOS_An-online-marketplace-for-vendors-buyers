// backend/src/modules/products/product.model.ts
import mongoose, { Schema, Document } from "mongoose";

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  pricePerUnit: { type: Number, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: String },
  vendorOrganizationId: { type: Schema.Types.ObjectId, ref: "Organization" }
}, { timestamps: true });

// Check this line carefully:
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;