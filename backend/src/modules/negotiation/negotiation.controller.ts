import { Request, Response } from "express";
import { NegotiationMessageModel } from "./negotiation.model";
import { MessageSenderRole } from "./negotiation.types";
import { assertRFQParticipant } from "./negotiation.guard";
import { createNotification } from "../notification/notification.service";
import { NotificationType } from "../notification/notification.types";
import { UserModel } from "../users/user.model";
import { RFQModel } from "../rfq/rfq.model";

/**
 * Send message in negotiation
 */
export const sendNegotiationMessage = async (req: Request, res: Response) => {
  const { rfqId } = req.params;

  const rfq = await assertRFQParticipant(rfqId, req.user.organizationId);

  const senderRole =
    rfq.buyerOrganizationId.toString() === req.user.organizationId
      ? MessageSenderRole.BUYER
      : MessageSenderRole.VENDOR;

  const messageRecord = await NegotiationMessageModel.create({
    rfqId,
    senderId: req.user.userId,
    senderRole,
    message: req.body.message,
    proposedUnitPrice: req.body.proposedUnitPrice,
  });

  const recipientOrgId =
    senderRole === MessageSenderRole.BUYER
      ? rfq.vendorOrganizationId
      : rfq.buyerOrganizationId;

  const recipientUser = await UserModel.findOne({
    organizationId: recipientOrgId,
  });

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
};

/**
 * Get negotiation thread for RFQ
 */
export const getNegotiationThread = async (req: Request, res: Response) => {
  const { rfqId } = req.params;

  await assertRFQParticipant(rfqId, req.user.organizationId);

  const messages = await NegotiationMessageModel.find({ rfqId })
    .sort({ createdAt: 1 })
    .populate("senderId", "email role");

  return res.status(200).json(messages);
};
