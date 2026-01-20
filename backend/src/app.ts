import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// 1. Added .js extensions to all local file imports
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./auth/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import negotiationRoutes from "./modules/negotiation/negotiation.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import escrowRoutes from "./modules/escrow/escrow.routes.js";
import rfqRoutes from "./modules/rfq/rfq.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";

// Import your RFQ model for the webhook (ensure path is correct and has .js)
import { RFQ } from "./modules/rfq/rfq.model.js"; 
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const app = express();

/* Global Middlewares */
app.use(cookieParser());

app.use(cors({
  // 2. Dynamic Origin: Allows Localhost in dev and Vercel in production
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL as string] 
    : 'http://localhost:3000', 
  
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Webhook Route (MUST stay above express.json)
app.post("/api/payments/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig!, 
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const rfqId = session.metadata?.rfqId;

    if (rfqId) {
      await RFQ.findByIdAndUpdate(rfqId, { status: 'PAID' });
      console.log(`✅ RFQ ${rfqId} marked as PAID`);
    }
  }

  res.json({ received: true });
});

app.use(express.json());

/* Routes */
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/products", productRoutes);
app.use("/api/negotiations", negotiationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/escrow", escrowRoutes);
app.use("/api/rfq", rfqRoutes);
app.use("/api/payments", paymentRoutes);

/* Error Handling */
app.use(notFound);
app.use(errorHandler);