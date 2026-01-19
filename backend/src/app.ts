import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./auth/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import productRoutes from "./modules/products/product.routes"
import negotiationRoutes from "./modules/negotiation/negotiation.routes";
import orderRoutes from "./modules/orders/order.routes";
import escrowRoutes from "./modules/escrow/escrow.routes";
import rfqRoutes from "./modules/rfq/rfq.routes";
import paymentRoutes from "./modules/payment/payment.routes";

dotenv.config();

export const app = express();

/* Global Middlewares */
// BACKEND CODE (Express)
app.use(cookieParser());
app.use(cors({
  // 1. Specify the EXACT origin (No wildcard *)
  origin: 'http://localhost:3000', 
  
  // 2. Allow credentials
  credentials: true, 
  
  // 3. Optional: Define allowed methods and headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// In app.ts - PLACE THIS ABOVE express.json()
app.post("/api/payments/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const rfqId = session.metadata.rfqId;

    // UPDATE YOUR DATABASE
    await RFQ.findByIdAndUpdate(rfqId, { status: 'PAID' });
    console.log(`✅ RFQ ${rfqId} marked as PAID`);
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
