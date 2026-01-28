import { Request, Response } from "express";
// Consolidate imports: Using both the named model and the default if necessary
import RFQ from "./rfq.model.js"; 
import Product from "../products/product.model.js"; 
import { OrderModel } from "../orders/order.model.js";
import { RFQStatus } from "./rfq.types.js";
import { createNotification } from "../notification/notification.service.js";
import { NotificationType } from "../notification/notification.types.js";
import { UserModel } from "../users/user.model.js";
/**
 * Buyer creates RFQ
 */
// backend/src/modules/rfq/rfq.controller.ts

export const createRFQ = async (req: any, res: any) => {
  try {
    const { productId, quantity, targetUnitPrice, message } = req.body;
    const buyerId = req.user.userId; // Extracted from verified JWT

    // 1. Find the product to get the Vendor's ID
    const product = await Product.findById(productId);
    
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
    const newRFQ = await RFQ.create({
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

  } catch (error: any) {
    console.error("❌ RFQ Controller Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
/**
 * Vendor views incoming RFQs
 */
export const getVendorRFQs = async (req: any, res: any) => {
  try {
    const vendorId = req.user.userId;

    // 🔍 DIAGNOSTIC LOGS
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 Vendor ID from Token:", vendorId);
    console.log("📊 Total RFQs in DB:", await RFQ.countDocuments());
    console.log("🎯 RFQs for this vendor:", await RFQ.countDocuments({ vendorId }));
    
    // Check if vendorId exists in ANY RFQ
    const allVendorIds = await RFQ.distinct("vendorId");
    console.log("📋 All Vendor IDs in RFQs:", allVendorIds);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    if (!vendorId) {
      return res.status(401).json({
        message: "Unauthorized: Vendor identity missing"
      });
    }

    const rfqs = await RFQ.find({ vendorId })
      .populate("productId", "name pricePerUnit images category stock")
      .populate("buyerId", "name email organizationName")
      .sort({ createdAt: -1 });

    console.log(`✅ Returning ${rfqs.length} RFQs`);

    res.status(200).json(rfqs); // ✅ Changed from 201 to 200
  } catch (error: any) {
    console.error("❌ getVendorRFQs Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Buyer views their own submitted RFQs
 */
// BACKEND CODE EXAMPLE
export const getBuyerRFQs = async (req: any, res: Response) => {
  try {
    // 1. Use the same key as createRFQ (userId)
    const buyerId = req.user?.userId || req.user?._id; 

    if (!buyerId) {
      return res.status(401).json({ message: "Unauthorized: No user identity found" });
    }

    console.log("Fetching RFQs for Buyer ID:", buyerId);

    const rfqs = await RFQ.find({ buyerId: buyerId })
      .populate("productId", "name category price images pricePerUnit") 
      .populate("vendorId", "organizationName email")
      .sort({ createdAt: -1 });

    res.status(200).json(rfqs);
  } catch (error: any) {
    console.error("CRITICAL BACKEND ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getRFQById = async (req: any, res: any) => {
  console.log("DEBUG: getRFQById hit with ID:", req.params.id); // <--- ADD THIS
  try {
    const rfq = await RFQ.findById(req.params.id)
      .populate("productId")
      .populate("buyerId", "name email")
      .populate("vendorId", "name"); // 👈 ADD THIS LINE
    
    if (!rfq) return res.status(404).json({ message: "RFQ not found" });
    res.status(200).json(rfq);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRFQStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { status, vendorCounterPrice } = req.body;

    const rfq = await RFQ.findByIdAndUpdate(
      id,
      {
        status,
        ...(vendorCounterPrice !== undefined && {
          vendorCounterPrice
        })
      },
      { new: true }
    ).populate("productId buyerId vendorId");

    if (!rfq) {
      return res.status(404).json({ message: "RFQ not found" });
    } 
    if (rfq.status === "ACCEPTED") {
  return res.status(403).json({
    message: "RFQ is locked after acceptance"
  });
}


    res.status(200).json(rfq);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const respondToRFQ = async (req: any, res: any) => {
  try {
    const vendorId = req.user.userId;
    const { rfqId } = req.params;
    const { status, vendorCounterPrice } = req.body;

    const rfq = await RFQ.findOne({ _id: rfqId, vendorId });

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
      const existingOrder = await OrderModel.findOne({ rfqId: rfq._id });

      if (!existingOrder) {
        await OrderModel.create({
          rfqId: rfq._id,
          buyerId: rfq.buyerId,
          vendorId: rfq.vendorId,
          productId: rfq.productId,
          quantity: rfq.quantity,
          unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
          totalAmount:
            rfq.quantity *
            (rfq.vendorCounterPrice || rfq.targetUnitPrice)
        });
      }
    }

    res.status(200).json({ message: "RFQ updated successfully" });
  } catch (error: any) {
    console.error("❌ respondToRFQ error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
