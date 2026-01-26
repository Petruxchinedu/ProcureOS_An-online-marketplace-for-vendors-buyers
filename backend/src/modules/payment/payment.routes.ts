import { Router } from "express";
import { createCheckoutSession } from "./payment.controller.js";
import { protect } from "../../middlewares/requireAuth.js";

const router = Router();

// Only authenticated users can pay
router.post("/create-checkout", protect, createCheckoutSession);

export default router;