import { Request, Response } from "express";
// Consolidate imports: Using both the named model and the default if necessary
import  RFQModel  from "./rfq.model.js";
import RFQ from "./rfq.model.js"; 
import ProductModel  from "../products/product.model.js";
import Product from "../products/product.model.js"; 

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
    const vendorId = product.vendorOrganizationId || (product as any).vendorId;

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
// backend/src/modules/rfq/rfq.controller.ts

export const getVendorRFQs = async (req: any, res: any) => {
  try {
    // 1. Try to get ID from multiple possible locations in the token
    const vendorId = req.user.organizationId || req.user.userId || req.user.id;

    console.log("🔍 Fetching RFQs for Vendor ID:", vendorId);

    if (!vendorId) {
      return res.status(400).json({ message: "Vendor identity not found in token" });
    }

    const rfqs = await RFQ.find({ vendorId })
      .populate("productId", "name pricePerUnit images")
      .populate("buyerId", "name email organizationName") 
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${rfqs.length} RFQs`);
    res.status(200).json(rfqs);
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
    const { status } = req.body; // Expecting "ACCEPTED" or "REJECTED"

    // 1. Find the RFQ and update it
    const rfq = await RFQ.findByIdAndUpdate(
      id, 
      { status: status }, 
      { new: true }
    ).populate("productId buyerId");

    if (!rfq) {
      return res.status(404).json({ message: "RFQ not found" });
    }

    console.log(`✅ RFQ ${id} marked as ${status}`);
    
    res.status(200).json({
      message: `Request ${status.toLowerCase()} successfully`,
      rfq
    });
  } catch (error: any) {
    console.error("❌ RFQ Status Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const respondToRFQ = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { status, vendorMessage } = req.body; // status can be 'ACCEPTED' or 'REJECTED'

    const rfq = await RFQ.findByIdAndUpdate(
      id,
      { 
        status, 
        vendorMessage,
        updatedAt: Date.now() 
      },
      { new: true }
    ).populate("productId buyerId");

    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    // logic: If accepted, you could trigger an email or notification here
    res.status(200).json({
      message: `RFQ has been ${status.toLowerCase()}`,
      rfq
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};