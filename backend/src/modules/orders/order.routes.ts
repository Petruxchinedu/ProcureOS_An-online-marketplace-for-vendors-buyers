import { Router } from "express";
import {
  createOrderFromRFQ,
  markOrderFulfilled,
  getInvoice,
} from "./order.controller.js";
import { protect } from "../../middlewares/requireAuth.js";

const router = Router();

router.post("/rfq/:rfqId/accept", protect, createOrderFromRFQ);
router.patch("/:orderId/fulfill", protect, markOrderFulfilled);
router.get("/:orderId/invoice", protect, getInvoice);

export default router;
