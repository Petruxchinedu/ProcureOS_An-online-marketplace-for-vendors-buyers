import { Router } from "express";
import {
  createOrderFromRFQ,
  markOrderFulfilled,
} from "./order.controller";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireRole } from "../../middlewares/requireRole";
import { UserRole } from "../users/user.types";

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
