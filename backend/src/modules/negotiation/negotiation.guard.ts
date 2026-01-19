import { RFQModel } from "../rfq/rfq.model";

export const assertRFQParticipant = async (
  rfqId: string,
  organizationId: string
) => {
  const rfq = await RFQModel.findById(rfqId);

  if (!rfq) {
    throw new Error("RFQ not found");
  }

  const isParticipant =
    rfq.buyerOrganizationId.toString() === organizationId ||
    rfq.vendorOrganizationId.toString() === organizationId;

  if (!isParticipant) {
    throw new Error("Access denied to this RFQ");
  }

  return rfq;
};
