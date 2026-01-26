import { Router } from "express";
import { 
  createRFQ, 
  getVendorRFQs, 
  getBuyerRFQs, 
  getRFQById, 
  updateRFQStatus, 
  respondToRFQ 
} from "./rfq.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

// Apply requireAuth to all RFQ routes since they all require a session
router.use(requireAuth);

/**
 * 1. STATIC/NAMED ROUTES (Specific)
 * These must be defined BEFORE dynamic routes like /:id
 */

/// ... existing imports

// Vendor-specific endpoints
router.get("/v/all", requireRole(UserRole.VENDOR), getVendorRFQs);

// Buyer-specific endpoints
router.get("/b/all", requireRole(UserRole.BUYER), getBuyerRFQs);
router.post("/", requireRole(UserRole.BUYER), createRFQ);
// 3. The dynamic ID route LAST
// Now, this only catches /api/rfq/ANY_ID, but NOT /api/rfq/list/...
router.get("/:id", getRFQById);

router.patch("/:id/status", updateRFQStatus);
router.patch("/:id/respond", respondToRFQ);

export default router;