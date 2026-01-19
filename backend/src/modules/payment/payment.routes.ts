import { Router } from "express";
import { createCheckoutSession } from "./payment.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

// Only authenticated users can pay
router.post("/create-checkout", requireAuth, createCheckoutSession);

export default router;