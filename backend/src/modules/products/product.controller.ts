import Product from "./product.model.js";
import { Request, Response } from "express";

/**
 * Create Product (Vendor only)
 */
export const createProduct = async (req: any, res: Response) => {
  try {
    const { name, description, pricePerUnit, minimumOrderQuantity, category, images } = req.body;

    console.log("🆕 Creating product for vendor:", req.user.email);
    console.log("📦 Product data:", { name, pricePerUnit, minimumOrderQuantity });

    const vendorId = req.user.userId;
    const vendorOrganizationId = req.user.organizationId;

    const newProduct = await Product.create({
      name,
      description,
      pricePerUnit,
      minimumOrderQuantity,
      category,
      images,
      vendorId, // ✅ Required field
      vendorOrganizationId
    });

    console.log("✅ Product created:", newProduct._id);
    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error("❌ Create Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all products (PUBLIC - no auth)
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("📋 Fetching all products...");

    const products = await Product.find({})
      .populate("vendorId", "email")
      .populate("vendorOrganizationId", "name")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${products.length} products`);
    
    return res.status(200).json(products);
  } catch (error: any) {
    console.error("❌ Get All Products Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to fetch products",
      error: error.message 
    });
  }
};

/**
 * Get single product by ID (PUBLIC - no auth)
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log("🔍 Fetching product:", id);

    const product = await Product.findById(id)
      .populate("vendorId", "email")
      .populate("vendorOrganizationId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("✅ Product found:", product.name);
    return res.status(200).json(product);
  } catch (error: any) {
    console.error("❌ Get Product Error:", error);
    return res.status(500).json({ message: "Invalid Product ID format" });
  }
};

/**
 * Vendor: Get own products
 */
export const getVendorProducts = async (req: any, res: Response) => {
  try {
    const vendorOrganizationId = req.user.organizationId;

    console.log("🏪 Fetching products for vendor org:", vendorOrganizationId);

    const products = await Product.find({ vendorOrganizationId })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${products.length} products for vendor`);
    
    return res.status(200).json(products);
  } catch (error: any) {
    console.error("❌ Get Vendor Products Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Vendor: Get my products
 */
export const getMyProducts = async (req: any, res: Response) => {
  try {
    const vendorId = req.user.userId;

    console.log("👤 Fetching products for vendor user:", vendorId);

    const products = await Product.find({ vendorId })
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${products.length} products`);
    
    return res.status(200).json(products);
  } catch (error: any) {
    console.error("❌ Get My Products Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const vendorId = req.user.userId;

    console.log("🗑️  Deleting product:", id, "for vendor:", vendorId);

    const product = await Product.findOneAndDelete({ 
      _id: id, 
      vendorId 
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    console.log("✅ Product deleted");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("❌ Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update product
 */
export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const vendorId = req.user.userId;
    const updates = req.body;

    console.log("📝 Updating product:", id);

    const product = await Product.findOneAndUpdate(
      { _id: id, vendorId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    console.log("✅ Product updated");
    res.status(200).json(product);
  } catch (error: any) {
    console.error("❌ Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};