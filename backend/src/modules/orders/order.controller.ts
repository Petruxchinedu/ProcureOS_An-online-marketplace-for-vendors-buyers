import { Request, Response } from "express";
import { OrderModel } from "./order.model.js";
import RFQModel from "../rfq/rfq.model.js";
import { EscrowModel } from "../escrow/escrow.model.js";
import { RFQStatus } from "../rfq/rfq.types.js";
import { OrderStatus } from "./order.types.js";
import { UserModel } from "../users/user.model.js";
import { createNotification } from "../notification/notification.service.js";
import { NotificationType } from "../notification/notification.types.js";

/**
 * Buyer accepts RFQ → creates order
 */
export const createOrderFromRFQ = async (req: Request, res: Response) => {
  const { rfqId } = req.params;
  const { unitPrice } = req.body;

  if (!req.user?.organizationId) {
    return res.status(403).json({ message: "Organization context required" });
  }

  const rfq = await RFQModel.findById(rfqId);
  if (!rfq) return res.status(404).json({ message: "RFQ not found" });

  if (rfq.buyerOrganizationId.toString() !== req.user.organizationId) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (![RFQStatus.SUBMITTED, RFQStatus.RESPONDED].includes(rfq.status)) {
    return res.status(400).json({ message: "RFQ cannot be accepted" });
  }

  const totalAmount = rfq.quantity * unitPrice;

  const order = await OrderModel.create({
    rfqId: rfq._id,
    productId: rfq.productId,
    buyerOrganizationId: rfq.buyerOrganizationId,
    vendorOrganizationId: rfq.vendorOrganizationId,
    quantity: rfq.quantity,
    unitPrice,
    totalAmount,
    status: OrderStatus.CREATED,
    createdBy: req.user.userId,
  });

  const escrow = await EscrowModel.create({
    orderId: order._id,
    amount: totalAmount,
    status: "HELD",
  });

  order.escrowId = escrow._id;
  await order.save();

  rfq.status = RFQStatus.ACCEPTED;
  await rfq.save();

  return res.status(201).json({ order, escrow });
};

/**
 * Vendor marks order as fulfilled
 */
export const markOrderFulfilled = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  if (!req.user?.organizationId) {
    return res.status(403).json({ message: "Organization context required" });
  }

  const order = await OrderModel.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.vendorOrganizationId !== req.user.organizationId) {
    return res.status(403).json({ message: "Access denied" });
  }

  order.status = OrderStatus.FULFILLED;
  await order.save();

  const buyerUser = await UserModel.findOne({
    organizationId: order.buyerOrganizationId,
  });

  if (buyerUser) {
    await createNotification({
      userId: buyerUser._id.toString(),
      type: NotificationType.ORDER_FULFILLED,
      title: "Order Fulfilled",
      message: "Your order has been fulfilled by the vendor.",
      email: buyerUser.email,
      metadata: { orderId: order._id },
    });
  }

  return res.status(200).json(order);
};

/**
 * Get invoice for order
 */
export const getInvoice = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId)
      .populate("buyerId", "name email")
      .populate("vendorId", "name email")
      .populate("productId", "name");

    if (!order) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const invoice = {
      invoiceNumber: `INV-${order._id.toString().slice(-6).toUpperCase()}`,
      issuedAt: new Date(),
      vendor: order.vendorId,
      buyer: order.buyerId,
      product: order.productId,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      total: order.totalAmount,
      status: order.status,
    };

    return res.status(200).json(invoice);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};


/**
 * Generate invoice for an accepted RFQ/Order
 */
export const getInvoiceByRFQId = async (req: any, res: Response) => {
  try {
    const { rfqId } = req.params;
    const vendorId = req.user.userId;

    console.log("📄 Generating invoice for RFQ:", rfqId);

    // 1. Find the RFQ
    const rfq = await RFQModel.findById(rfqId)
      .populate("productId", "name description category")
      .populate("buyerId", "email organizationName")
      .populate("vendorId", "email organizationName");

    if (!rfq) {
      return res.status(404).json({ message: "RFQ not found" });
    }

    // 2. Verify vendor owns this RFQ
    if (rfq.vendorId._id.toString() !== vendorId) {
      return res.status(403).json({ message: "Unauthorized: Not your RFQ" });
    }

    // 3. Check if RFQ is accepted
    if (rfq.status !== "ACCEPTED") {
      return res.status(400).json({ 
        message: "Cannot generate invoice. RFQ must be accepted first." 
      });
    }

    // 4. Find or create order
    let order = await OrderModel.findOne({ rfqId: rfq._id });

    if (!order) {
      // Create order if it doesn't exist
      order = await OrderModel.create({
        rfqId: rfq._id,
        buyerId: rfq.buyerId,
        vendorId: rfq.vendorId,
        productId: rfq.productId,
        quantity: rfq.quantity,
        unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
        totalAmount: rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice),
        status: "PENDING"
      });
    }

    // 5. Generate invoice number
    const invoiceNumber = `INV-${Date.now()}-${rfq._id.toString().slice(-6).toUpperCase()}`;

    // 6. Calculate amounts
    const subtotal = rfq.quantity * (rfq.vendorCounterPrice || rfq.targetUnitPrice);
    const platformFee = subtotal * 0.02; // 2% platform fee
    const total = subtotal;
    const netRevenue = subtotal - platformFee;

    // 7. Build invoice response
    const invoice = {
      invoiceNumber,
      rfqId: rfq._id,
      orderId: order._id,
      status: "PAID", // or order.status
      issuedAt: order.createdAt,
      
      // Parties
      vendor: {
        id: rfq.vendorId._id,
        name: rfq.vendorId.organizationName || rfq.vendorId.email,
        email: rfq.vendorId.email
      },
      buyer: {
        id: rfq.buyerId._id,
        name: rfq.buyerId.organizationName || rfq.buyerId.email,
        email: rfq.buyerId.email,
        organizationName: rfq.buyerId.organizationName
      },

      // Product details
      product: {
        id: rfq.productId._id,
        name: rfq.productId.name,
        description: rfq.productId.description,
        category: rfq.productId.category
      },

      // Amounts
      quantity: rfq.quantity,
      unitPrice: rfq.vendorCounterPrice || rfq.targetUnitPrice,
      subtotal,
      platformFee,
      total,
      netRevenue,

      // Metadata
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };

    console.log("✅ Invoice generated successfully");

    return res.status(200).json(invoice);

  } catch (error: any) {
    console.error("❌ getInvoiceByRFQId Error:", error);
    return res.status(500).json({ message: error.message });
  }
};