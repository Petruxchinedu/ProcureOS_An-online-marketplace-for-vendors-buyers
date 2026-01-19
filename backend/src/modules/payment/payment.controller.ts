import Stripe from 'stripe';
import RFQ from "../rfq/rfq.model";
import { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, 
});

export const createCheckoutSession = async (req: any, res: Response) => {
  try {
    const { rfqId } = req.body;

    // 1. Get RFQ data to ensure the price is correct
    const rfq = await RFQ.findById(rfqId).populate("productId");
    if (!rfq) return res.status(404).json({ message: "RFQ record not found" });

    // 2. Determine price (use counter price if exists, else target price)
    const finalPrice = rfq.vendorCounterPrice || rfq.targetUnitPrice;
    const amountInCents = Math.round(finalPrice * 100);

    // 3. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: (rfq.productId as any).name,
            description: `Payment for RFQ #${rfq._id}`,
          },
          unit_amount: amountInCents,
        },
        quantity: rfq.quantity,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/dashboard/buyer/payment-success?id=${rfq._id}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/buyer/rfq/list`,
      metadata: { 
        rfqId: rfq._id.toString(),
        buyerId: req.user.userId 
      }
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: error.message });
  }
};