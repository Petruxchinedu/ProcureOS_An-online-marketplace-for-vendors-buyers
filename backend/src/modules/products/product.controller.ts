import { Request, Response } from "express";
import { ProductModel } from "./product.model";
import { ProductStatus } from "./product.types";
import Product from "./product.model"; // Ensure your model path is correct

/**
 * Create Product (Vendor only)
 */

export const createProduct = async (req: any, res: any) => {
  try {
    const { name, description, pricePerUnit, minimumOrderQuantity, category, images } = req.body;

    // Use the organizationId from the verified token
    const vendorOrganizationId = req.user.organizationId || req.user.userId;

    const newProduct = await Product.create({
      name,
      description,
      pricePerUnit,
      minimumOrderQuantity,
      category,
      images,
      vendorOrganizationId // 👈 CRITICAL: This links the product to the vendor
    });

    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Vendor: List Own Products
 */
export const getVendorProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({
    vendorOrganizationId: req.user.organizationId,
  }).sort({ createdAt: -1 });

  return res.status(200).json(products);
};

// backend/src/modules/products/product.controller.ts

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Make sure this matches the :id in your route
    
    // Use findById for single document retrieval
    const product = await Product.findById(id).populate("vendorOrganizationId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    console.error("Fetch Product Error:", error.message);
    return res.status(500).json({ message: "Invalid Product ID format" });
  }
};
// backend/src/modules/products/product.controller.ts

import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("🚀 CHECKPOINT 1: Route hit successfully");

    // We use .find({}) to get everything. 
    // IMPORTANT: Temporarily remove .populate() to see if the error stops.
    const products = await Product.find({});
    
    console.log(`✅ CHECKPOINT 2: Found ${products.length} products`);

    return res.status(200).json(products);
  } catch (error: any) {
    // This logs the REAL error to your BACKEND terminal
    console.error("❌ BACKEND CRASH:", error.message);
    
    return res.status(500).json({ 
      success: false,
      message: "Backend crash detected",
      error: error.message 
    });
  }
};

export const getMyProducts = async (req: any, res: any) => {
  try {
    const vendorId = req.user.organizationId || req.user.userId;
    
    // DEBUG LOGS - Check these in your terminal!
    console.log("🕵️ Checking Inventory for User:", req.user.email);
    console.log("🆔 Searching for vendorOrganizationId:", vendorId);

   const products = await Product.find({ vendorOrganizationId: vendorId });

    console.log(`📊 Result: Found ${products.length} products in DB`);
    
    return res.status(200).json(products);
  } catch (error: any) {
    console.error("❌ Inventory Fetch Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// backend/src/modules/products/product.controller.ts

export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const vendorId = req.user.organizationId || req.user.userId;

    // We search by ID AND VendorID to ensure a vendor can't delete someone else's product!
    const product = await Product.findOneAndDelete({ _id: id, vendorOrganizationId: vendorId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// backend/src/modules/products/product.controller.ts

export const updateProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const vendorId = req.user.organizationId || req.user.userId;
    const updates = req.body;

    // We find by ID AND ensure the vendorOrganizationId matches the logged-in user
    const product = await Product.findOneAndUpdate(
      { _id: id, vendorOrganizationId: vendorId },
      { $set: updates },
      { new: true, runValidators: true } // 'new: true' returns the updated document
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    console.log("✅ Product updated successfully:", id);
    res.status(200).json(product);
  } catch (error: any) {
    console.error("❌ Update Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};