// backend/src/modules/negotiation/negotiation.controller.ts
import { Request, Response } from "express";
import { NegotiationMessageModel } from "./negotiation.model.js";
import { MessageSenderRole } from "./negotiation.types.js";
import { assertRFQParticipant } from "./negotiation.guard.js";
import { createNotification } from "../notification/notification.service.js";
import { NotificationType } from "../notification/notification.types.js";
import { UserModel } from "../users/user.model.js";

/**
 * Send a negotiation message for a given RFQ
 */
export const sendNegotiationMessage = async (req: Request, res: Response) => {
  try {
    const rfqId = req.params.rfqId as string;

    // 1️⃣ Guard: organization context
    if (!req.user?.organizationId) {
      return res.status(400).json({ message: "Organization context required" });
    }

    // 2️⃣ Ensure the user is a participant of the RFQ
    const rfq = await assertRFQParticipant(rfqId, req.user.organizationId);

    // 3️⃣ Determine sender role
    const senderRole =
      rfq.buyerOrganizationId.toString() === req.user.organizationId
        ? MessageSenderRole.BUYER
        : MessageSenderRole.VENDOR;

    // 4️⃣ Create negotiation message
    const messageRecord = await NegotiationMessageModel.create({
      rfqId,
      senderId: req.user.userId,
      senderRole,
      message: req.body.message,
      proposedUnitPrice: req.body.proposedUnitPrice,
    });

    // 5️⃣ Determine recipient
    const recipientOrgId =
      senderRole === MessageSenderRole.BUYER
        ? rfq.vendorOrganizationId
        : rfq.buyerOrganizationId;

    const recipientUser = await UserModel.findOne({ organizationId: recipientOrgId });

    // 6️⃣ Create notification for recipient
    if (recipientUser) {
      await createNotification({
        userId: recipientUser._id.toString(),
        type: NotificationType.NEGOTIATION_MESSAGE,
        title: "New Negotiation Message",
        message: "You have received a new negotiation message.",
        email: recipientUser.email,
        metadata: { rfqId },
      });
    }

    return res.status(201).json(messageRecord);
  } catch (error: any) {
    console.error("sendNegotiationMessage error:", error);
    return res.status(500).json({ message: "Failed to send negotiation message" });
  }
};

/**
 * Get negotiation thread (all messages) for a given RFQ
 */
export const getNegotiationThread = async (req: Request, res: Response) => {
  try {
    const rfqId = req.params.rfqId as string;

    // 1️⃣ Guard: organization context
    if (!req.user?.organizationId) {
      return res.status(400).json({ message: "Organization context required" });
    }

    // 2️⃣ Ensure the user is a participant of the RFQ
    await assertRFQParticipant(rfqId, req.user.organizationId);

    // 3️⃣ Fetch messages, sorted by creation time
    const messages = await NegotiationMessageModel.find({ rfqId })
      .sort({ createdAt: 1 })
      .populate("senderId", "email role");

    return res.status(200).json(messages);
  } catch (error: any) {
    console.error("getNegotiationThread error:", error);
    return res.status(500).json({ message: "Failed to fetch negotiation thread" });
  }
};
