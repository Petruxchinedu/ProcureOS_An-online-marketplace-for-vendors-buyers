import { Router } from "express";
import { confirmDeliveryAndReleaseEscrow } from "./escrow.controller";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { UserRole } from "../users/user.types";

const router = Router();

router.post(
  "/orders/:orderId/confirm",
  requireAuth,
  requireRole(UserRole.BUYER),
  confirmDeliveryAndReleaseEscrow
);

export default router;
