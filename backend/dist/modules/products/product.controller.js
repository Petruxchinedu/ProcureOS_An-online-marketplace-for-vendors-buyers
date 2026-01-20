"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getMyProducts = exports.getAllProducts = exports.getProductById = exports.getVendorProducts = exports.createProduct = void 0;
const product_model_js_1 = __importDefault(require("./product.model.js"));
const product_model_1 = __importDefault(require("./product.model")); // Ensure your model path is correct
/**
 * Create Product (Vendor only)
 */
const createProduct = async (req, res) => {
    try {
        const { name, description, pricePerUnit, minimumOrderQuantity, category, images } = req.body;
        // Use the organizationId from the verified token
        const vendorOrganizationId = req.user.organizationId || req.user.userId;
        const newProduct = await product_model_1.default.create({
            name,
            description,
            pricePerUnit,
            minimumOrderQuantity,
            category,
            images,
            vendorOrganizationId // 👈 CRITICAL: This links the product to the vendor
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
/**
 * Vendor: List Own Products
 */
const getVendorProducts = async (req, res) => {
    const products = await product_model_js_1.default.find({
        vendorOrganizationId: req.user.organizationId,
    }).sort({ createdAt: -1 });
    return res.status(200).json(products);
};
exports.getVendorProducts = getVendorProducts;
// backend/src/modules/products/product.controller.ts
const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Make sure this matches the :id in your route
        // Use findById for single document retrieval
        const product = await product_model_1.default.findById(id).populate("vendorOrganizationId", "name");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.error("Fetch Product Error:", error.message);
        return res.status(500).json({ message: "Invalid Product ID format" });
    }
};
exports.getProductById = getProductById;
// backend/src/modules/products/product.controller.ts
const getAllProducts = async (req, res) => {
    try {
        console.log("🚀 CHECKPOINT 1: Route hit successfully");
        // We use .find({}) to get everything. 
        // IMPORTANT: Temporarily remove .populate() to see if the error stops.
        const products = await product_model_1.default.find({});
        console.log(`✅ CHECKPOINT 2: Found ${products.length} products`);
        return res.status(200).json(products);
    }
    catch (error) {
        // This logs the REAL error to your BACKEND terminal
        console.error("❌ BACKEND CRASH:", error.message);
        return res.status(500).json({
            success: false,
            message: "Backend crash detected",
            error: error.message
        });
    }
};
exports.getAllProducts = getAllProducts;
const getMyProducts = async (req, res) => {
    try {
        const vendorId = req.user.organizationId || req.user.userId;
        // DEBUG LOGS - Check these in your terminal!
        console.log("🕵️ Checking Inventory for User:", req.user.email);
        console.log("🆔 Searching for vendorOrganizationId:", vendorId);
        const products = await product_model_1.default.find({ vendorOrganizationId: vendorId });
        console.log(`📊 Result: Found ${products.length} products in DB`);
        return res.status(200).json(products);
    }
    catch (error) {
        console.error("❌ Inventory Fetch Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getMyProducts = getMyProducts;
// backend/src/modules/products/product.controller.ts
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorId = req.user.organizationId || req.user.userId;
        // We search by ID AND VendorID to ensure a vendor can't delete someone else's product!
        const product = await product_model_1.default.findOneAndDelete({ _id: id, vendorOrganizationId: vendorId });
        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
// backend/src/modules/products/product.controller.ts
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorId = req.user.organizationId || req.user.userId;
        const updates = req.body;
        // We find by ID AND ensure the vendorOrganizationId matches the logged-in user
        const product = await product_model_1.default.findOneAndUpdate({ _id: id, vendorOrganizationId: vendorId }, { $set: updates }, { new: true, runValidators: true } // 'new: true' returns the updated document
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }
        console.log("✅ Product updated successfully:", id);
        res.status(200).json(product);
    }
    catch (error) {
        console.error("❌ Update Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.updateProduct = updateProduct;
