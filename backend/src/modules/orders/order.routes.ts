import { Router } from "express";
import {
  createOrderFromRFQ,
  markOrderFulfilled,
} from "./order.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

router.post(
  "/rfq/:rfqId",
  requireAuth,
  requireRole(UserRole.BUYER) as any,
  createOrderFromRFQ
);

router.post(
  "/:orderId/fulfill",
  requireAuth,
  requireRole(UserRole.VENDOR) as any,
  markOrderFulfilled
);

export default router;
