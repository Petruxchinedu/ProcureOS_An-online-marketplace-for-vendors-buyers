import { Request, Response } from "express";
import { OrderModel } from "../orders/order.model.js";
import { EscrowModel } from "./escrow.model.js";
import { OrderStatus } from "../orders/order.types.js";
import { EscrowStatus } from "./escrow.types.js";
import { UserModel } from "../users/user.model";
import { createNotification } from "../notification/notification.service.js";
import { NotificationType } from "../notification/notification.types.js";

/**
 * Buyer confirms delivery → releases escrow
 */
export const confirmDeliveryAndReleaseEscrow = async (
  req: Request,
  res: Response
) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.buyerOrganizationId.toString() !== req.user.organizationId) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (order.status !== OrderStatus.FULFILLED) {
    return res.status(400).json({
      message: "Order must be fulfilled before confirmation",
    });
  }

  const escrow = await EscrowModel.findById(order.escrowId);
  if (!escrow) return res.status(404).json({ message: "Escrow record not found" });

  if (escrow.status !== EscrowStatus.HELD) {
    return res.status(400).json({ message: "Escrow already processed" });
  }

  /**
   * STATE TRANSITIONS (Atomic)
   */
  escrow.status = EscrowStatus.RELEASED;
  order.status = OrderStatus.COMPLETED;

  await escrow.save();
  await order.save();

  const vendorUser = await UserModel.findOne({
    organizationId: order.vendorOrganizationId,
  });

  if (vendorUser) {
    await createNotification({
      userId: vendorUser._id.toString(),
      type: NotificationType.ESCROW_RELEASED,
      title: "Payment Released",
      message: "Escrow funds have been released to your account.",
      email: vendorUser.email,
      metadata: { orderId: order._id },
    });
  }

  return res.status(200).json({
    message: "Delivery confirmed. Escrow released to vendor.",
    order,
    escrow,
  });
};
