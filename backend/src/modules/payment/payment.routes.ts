import { Router } from "express";
import { createCheckoutSession } from "./payment.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";

const router = Router();

// Only authenticated users can pay
router.post("/create-checkout", requireAuth, createCheckoutSession);

export default router;