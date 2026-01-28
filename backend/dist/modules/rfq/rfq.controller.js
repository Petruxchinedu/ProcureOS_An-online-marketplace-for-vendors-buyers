"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRFQStatus = exports.respondToRFQ = exports.getRFQById = exports.getBuyerRFQs = exports.getVendorRFQs = exports.createRFQ = void 0;
const rfq_model_js_1 = __importDefault(require("./rfq.model.js"));
const product_model_js_1 = __importDefault(require("../products/product.model.js"));
const order_model_js_1 = require("../orders/order.model.js");
/**
 * ✅ Buyer creates RFQ
 */
const createRFQ = async (req, res) => {
    try {
        const { productId, quantity, targetUnitPrice, message } = req.body;
        const buyerId = req.user.userId;
        const product = await product_model_js_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const vendorId = product.vendorId;
        if (!vendorId) {
            return res.status(400).json({
                message: "This product does not have an assigned vendor."
            });
        }
        const newRFQ = await rfq_model_js_1.default.create({
            productId,
            buyerId,
            vendorId,
            quantity: Number(quantity),
            targetUnitPrice: targetUnitPrice ? Number(targetUnitPrice) : product.pricePerUnit,
            message,
            status: "PENDING"
        });
        console.log("✅ RFQ Created for Vendor:", vendorId);
        return res.status(201).json({
            success: true,
            message: "Request sent to vendor!",
            data: newRFQ
        });
    }
    catch (error) {
        console.error("❌ createRFQ Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
exports.createRFQ = createRFQ;
/**
 * ✅ Vendor views incoming RFQs - ENHANCED WITH DIAGNOSTICS
 */
const mongoose_1 = __importDefault(require("mongoose"));
const getVendorRFQs = async (req, res) => {
    try {
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔍 VENDOR RFQ FETCH REQUEST");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        // 1. Get vendor ID from token
        const vendorIdString = req.user?.userId;
        console.log("1️⃣ Auth Check:");
        console.log("   req.user:", req.user);
        console.log("   vendorId (string):", vendorIdString);
        console.log("   vendorId type:", typeof vendorIdString);
        if (!vendorIdString) {
            console.log("❌ UNAUTHORIZED: No vendor ID found");
            return res.status(401).json({
                message: "Unauthorized: Vendor identity missing"
            });
        }
        // 2. Convert to ObjectId for MongoDB query
        let vendorObjectId;
        try {
            vendorObjectId = new mongoose_1.default.Types.ObjectId(vendorIdString);
            console.log("   vendorId (ObjectId):", vendorObjectId);
        }
        catch (err) {
            console.error("❌ Invalid ObjectId format:", vendorIdString);
            return res.status(400).json({ message: "Invalid vendor ID format" });
        }
        // 3. Database diagnostics
        console.log("\n2️⃣ Database Diagnostics:");
        const totalRFQs = await rfq_model_js_1.default.countDocuments();
        const vendorRFQCount = await rfq_model_js_1.default.countDocuments({ vendorId: vendorObjectId });
        const allVendorIds = await rfq_model_js_1.default.distinct("vendorId");
        console.log(`   Total RFQs in DB: ${totalRFQs}`);
        console.log(`   RFQs for this vendor: ${vendorRFQCount}`);
        console.log("   All Vendor IDs in RFQs:", allVendorIds.map(id => id.toString()));
        // 4. ID comparison
        console.log("\n3️⃣ ID Comparison:");
        if (allVendorIds.length > 0) {
            allVendorIds.forEach((id, index) => {
                const matches = id.toString() === vendorIdString;
                console.log(`   RFQ[${index}] vendorId: ${id} - Match: ${matches ? '✅' : '❌'}`);
            });
        }
        // 5. Fetch RFQs using ObjectId
        console.log("\n4️⃣ Fetching RFQs...");
        const rfqs = await rfq_model_js_1.default.find({ vendorId: vendorObjectId })
            .populate({
            path: "productId",
            select: "name pricePerUnit images category stock"
        })
            .populate({
            path: "buyerId",
            select: "email"
        })
            .sort({ createdAt: -1 })
            .lean();
        console.log(`✅ Found ${rfqs.length} RFQs`);
        if (rfqs.length > 0) {
            console.log("\n📦 First RFQ:");
            console.log("   RFQ ID:", rfqs[0]._id);
            console.log("   Product:", rfqs[0].productId?.name);
            console.log("   Status:", rfqs[0].status);
            console.log("   Quantity:", rfqs[0].quantity);
        }
        else {
            console.log("\n⚠️  No RFQs found!");
            console.log("   Possible causes:");
            console.log("   - No buyers have created RFQs yet");
            console.log("   - Products don't have correct vendorId");
            console.log("   - Run the seed script: npx tsx src/scripts/seedTestRFQ.ts");
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        return res.status(200).json(rfqs);
    }
    catch (error) {
        console.error("\n❌ getVendorRFQs ERROR:", error);
        return res.status(500).json({
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
exports.getVendorRFQs = getVendorRFQs;
/**
 * ✅ Buyer views their RFQs
 */
const getBuyerRFQs = async (req, res) => {
    try {
        const buyerId = req.user?.userId;
        if (!buyerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const rfqs = await rfq_model_js_1.default.find({ buyerId })
            .populate("productId", "name category pricePerUnit images")
            .populate("vendorId", "name email organizationName")
            .sort({ createdAt: -1 });
        return res.status(200).json(rfqs);
    }
    catch (error) {
        console.error("❌ getBuyerRFQs Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getBuyerRFQs = getBuyerRFQs;
/**
 * ✅ Get single RFQ by ID
 */
const getRFQById = async (req, res) => {
    try {
        console.log("🔍 Fetching RFQ ID:", req.params.id);
        const rfq = await rfq_model_js_1.default.findById(req.params.id)
            .populate("productId")
            .populate("buyerId", "name email")
            .populate("vendorId", "name email");
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        return res.status(200).json(rfq);
    }
    catch (error) {
        console.error("❌ getRFQById Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getRFQById = getRFQById;
/**
 * ✅ Vendor responds to RFQ
 */
const respondToRFQ = async (req, res) => {
    try {
        const vendorId = req.user.userId;
        const { rfqId } = req.params;
        const { status, vendorCounterPrice } = req.body;
        const rfq = await rfq_model_js_1.default.findOne({ _id: rfqId, vendorId });
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found or unauthorized" });
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
        // Create order on acceptance
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
                    totalAmount: rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice)
                });
            }
        }
        return res.status(200).json({
            message: "RFQ updated successfully",
            rfq
        });
    }
    catch (error) {
        console.error("❌ respondToRFQ Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.respondToRFQ = respondToRFQ;
/**
 * ✅ Update RFQ status (alternative endpoint)
 */
const updateRFQStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, vendorCounterPrice } = req.body;
        const rfq = await rfq_model_js_1.default.findById(id);
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        if (rfq.status === "ACCEPTED") {
            return res.status(403).json({
                message: "RFQ is locked after acceptance"
            });
        }
        rfq.status = status;
        if (vendorCounterPrice !== undefined) {
            rfq.vendorCounterPrice = vendorCounterPrice;
        }
        await rfq.save();
        const populated = await rfq_model_js_1.default.findById(rfq._id)
            .populate("productId")
            .populate("buyerId")
            .populate("vendorId");
        return res.status(200).json(populated);
    }
    catch (error) {
        console.error("❌ updateRFQStatus Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.updateRFQStatus = updateRFQStatus;
