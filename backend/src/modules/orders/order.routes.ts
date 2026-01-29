import { Router } from "express";
import {
  createOrderFromRFQ,
  markOrderFulfilled,
  getInvoice,
  getInvoiceByRFQId 
} from "./order.controller.js";
import { protect } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

router.use(protect);

router.post("/rfq/:rfqId/accept", createOrderFromRFQ);
router.patch("/:orderId/fulfill", markOrderFulfilled);

// Invoice routes - specific path first!
router.get("/invoice/rfq/:rfqId", requireRole(UserRole.VENDOR), getInvoiceByRFQId);
router.get("/:orderId/invoice", getInvoice);

export default router;