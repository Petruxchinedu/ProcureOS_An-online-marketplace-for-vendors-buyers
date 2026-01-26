"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondToRFQ = exports.updateRFQStatus = exports.getRFQById = exports.getBuyerRFQs = exports.getVendorRFQs = exports.createRFQ = void 0;
// Consolidate imports: Using both the named model and the default if necessary
const rfq_model_js_1 = __importDefault(require("./rfq.model.js"));
const product_model_js_1 = __importDefault(require("../products/product.model.js"));
const order_model_js_1 = require("../orders/order.model.js");
/**
 * Buyer creates RFQ
 */
// backend/src/modules/rfq/rfq.controller.ts
const createRFQ = async (req, res) => {
    try {
        const { productId, quantity, targetUnitPrice, message } = req.body;
        const buyerId = req.user.userId; // Extracted from verified JWT
        // 1. Find the product to get the Vendor's ID
        const product = await product_model_js_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // 2. Identify the Vendor
        // IMPORTANT: Make sure your Product model uses 'vendorOrganizationId' or 'vendorId'
        const vendorId = product.vendorId;
        if (!vendorId) {
            return res.status(400).json({
                message: "This product does not have an assigned vendor."
            });
        }
        // 3. Create the RFQ with the required vendorId
        const newRFQ = await rfq_model_js_1.default.create({
            productId,
            buyerId,
            vendorId, // 👈 This fixes the "Path vendorId is required" error
            quantity: Number(quantity),
            targetUnitPrice: targetUnitPrice ? Number(targetUnitPrice) : product.pricePerUnit,
            message,
            status: "PENDING"
        });
        console.log("✅ RFQ Created Successfully for Vendor:", vendorId);
        return res.status(201).json({
            success: true,
            message: "Request sent to vendor!",
            data: newRFQ
        });
    }
    catch (error) {
        console.error("❌ RFQ Controller Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
exports.createRFQ = createRFQ;
/**
 * Vendor views incoming RFQs
 */
const getVendorRFQs = async (req, res) => {
    try {
        // SINGLE SOURCE OF TRUTH
        const vendorId = req.user.userId;
        if (!vendorId) {
            return res.status(401).json({
                message: "Unauthorized: Vendor identity missing"
            });
        }
        console.log("🔍 Fetching RFQs for Vendor ID:", vendorId);
        const rfqs = await rfq_model_js_1.default.find({ vendorId })
            .populate("productId", "name pricePerUnit images category stock")
            .populate("buyerId", "name email organizationName")
            .sort({ createdAt: -1 });
        console.log(`✅ Found ${rfqs.length} RFQs for vendor terminal`);
        res.status(200).json(rfqs);
    }
    catch (error) {
        console.error("❌ getVendorRFQs Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getVendorRFQs = getVendorRFQs;
/**
 * Buyer views their own submitted RFQs
 */
// BACKEND CODE EXAMPLE
const getBuyerRFQs = async (req, res) => {
    try {
        // 1. Use the same key as createRFQ (userId)
        const buyerId = req.user?.userId || req.user?._id;
        if (!buyerId) {
            return res.status(401).json({ message: "Unauthorized: No user identity found" });
        }
        console.log("Fetching RFQs for Buyer ID:", buyerId);
        const rfqs = await rfq_model_js_1.default.find({ buyerId: buyerId })
            .populate("productId", "name category price images pricePerUnit")
            .populate("vendorId", "organizationName email")
            .sort({ createdAt: -1 });
        res.status(200).json(rfqs);
    }
    catch (error) {
        console.error("CRITICAL BACKEND ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};
exports.getBuyerRFQs = getBuyerRFQs;
const getRFQById = async (req, res) => {
    console.log("DEBUG: getRFQById hit with ID:", req.params.id); // <--- ADD THIS
    try {
        const rfq = await rfq_model_js_1.default.findById(req.params.id)
            .populate("productId")
            .populate("buyerId", "name email")
            .populate("vendorId", "name"); // 👈 ADD THIS LINE
        if (!rfq)
            return res.status(404).json({ message: "RFQ not found" });
        res.status(200).json(rfq);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getRFQById = getRFQById;
const updateRFQStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, vendorCounterPrice } = req.body;
        const rfq = await rfq_model_js_1.default.findByIdAndUpdate(id, {
            status,
            ...(vendorCounterPrice !== undefined && {
                vendorCounterPrice
            })
        }, { new: true }).populate("productId buyerId vendorId");
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        if (rfq.status === "ACCEPTED") {
            return res.status(403).json({
                message: "RFQ is locked after acceptance"
            });
        }
        res.status(200).json(rfq);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRFQStatus = updateRFQStatus;
const respondToRFQ = async (req, res) => {
    try {
        const vendorId = req.user.userId;
        const { rfqId } = req.params;
        const { status, vendorCounterPrice } = req.body;
        const rfq = await rfq_model_js_1.default.findOne({ _id: rfqId, vendorId });
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        if (rfq.status === "ACCEPTED") {
            return res.status(403).json({
                message: "Negotiation closed. RFQ already accepted."
            });
        }
        rfq.status = status;
        if (vendorCounterPrice) {
            rfq.vendorCounterPrice = vendorCounterPrice;
        }
        await rfq.save();
        // 🔐 CREATE ORDER ONLY ON ACCEPT
        if (status === "ACCEPTED") {
            const existingOrder = await order_model_js_1.OrderModel.findOne({ rfqId: rfq._id });
            if (!existingOrder) {
                await order_model_js_1.OrderModel.create({
                    rfqId: rfq._id,
                    buyerId: rfq.buyerId,
                    vendorId: rfq.vendorId,
                    productId: rfq.productId,
                    quantity: rfq.quantity,
                    unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
                    totalAmount: rfq.quantity *
                        (rfq.vendorCounterPrice || rfq.targetUnitPrice)
                });
            }
        }
        res.status(200).json({ message: "RFQ updated successfully" });
    }
    catch (error) {
        console.error("❌ respondToRFQ error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.respondToRFQ = respondToRFQ;
