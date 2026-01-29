import { Router } from "express";
import { 
  createRFQ, 
  getVendorRFQs, 
  getBuyerRFQs, 
  getRFQById, 
  updateRFQStatus, 
  respondToRFQ 
} from "./rfq.controller.js";
import { protect } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

// Apply auth to ALL routes
router.use(protect);

/**
 * ✅ CRITICAL ORDER:
 * Static/named routes MUST be defined BEFORE dynamic /:id routes
 * Otherwise Express will match "/vendor" as if it's an ID parameter
 */

// 1. STATIC ROUTES FIRST (specific paths)
router.get("/vendor", requireRole(UserRole.VENDOR), getVendorRFQs);
router.get("/buyer", requireRole(UserRole.BUYER), getBuyerRFQs);
router.post("/", requireRole(UserRole.BUYER), createRFQ);

// 2. DYNAMIC ROUTES LAST (parameterized paths)
router.get("/:id", getRFQById);
router.patch("/:id/status", updateRFQStatus);
router.patch("/:id/respond", respondToRFQ);

export default router;