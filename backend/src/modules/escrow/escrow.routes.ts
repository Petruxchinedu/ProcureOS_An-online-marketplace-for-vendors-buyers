import { Router } from "express";
import { confirmDeliveryAndReleaseEscrow } from "./escrow.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

router.post(
  "/orders/:orderId/confirm",
  requireAuth,
  requireRole(UserRole.BUYER) as any,
  confirmDeliveryAndReleaseEscrow
);

export default router;
