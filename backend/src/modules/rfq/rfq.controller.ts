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
    const buyerId = req.user.userId;

    // 1. Find the product and the VENDOR who owns it
    const product = await Product.findById(productId);
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 2. CRITICAL: Identify the correct Vendor ID from the product
    // Check all possible field names you might have used in your Product model
    const vendorId = product.vendorId || product.vendorOrganizationId || product.owner;

    if (!vendorId) {
      return res.status(400).json({ message: "Product has no owner (Vendor ID missing)" });
    }

    // 3. Create the RFQ
    const newRFQ = await RFQ.create({
      productId,
      buyerId,
      vendorId, // This links it to the Vendor's Lead Box
      quantity: Number(quantity),
      targetUnitPrice: targetUnitPrice || product.pricePerUnit,
      message,
      status: "PENDING"
    });

    res.status(201).json({ success: true, data: newRFQ });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Vendor views incoming RFQs
 */
export const getVendorRFQs = async (req: any, res: any) => {
  try {
    // 1. Get all possible IDs the user might be identified by
    const userId = req.user.userId;
    const orgId = req.user.organizationId;

    console.log(`🔍 DEBUG: Fetching for User: ${userId} or Org: ${orgId}`);

    // 2. Search for RFQs where vendorId matches EITHER the User or their Org
    const rfqs = await RFQ.find({
      $or: [
        { vendorId: userId },
        { vendorId: orgId }
      ]
    })
      .populate("productId", "name pricePerUnit images category stock")
      .populate("buyerId", "name email organizationName")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${rfqs.length} RFQs for this vendor terminal.`);
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
    const { status, vendorCounterPrice } = req.body; 

    const updateData: any = { status };
    if (vendorCounterPrice) {
      updateData.targetUnitPrice = vendorCounterPrice; // Update the price if countering
    }

    const rfq = await RFQ.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    ).populate("productId buyerId");

    if (!rfq) return res.status(404).json({ message: "RFQ not found" });

    res.status(200).json({ message: "Terminal Updated", rfq });
  } catch (error: any) {
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