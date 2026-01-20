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
  requireRole(UserRole.BUYER),
  createOrderFromRFQ
);

router.post(
  "/:orderId/fulfill",
  requireAuth,
  requireRole(UserRole.VENDOR),
  markOrderFulfilled
);

export default router;
