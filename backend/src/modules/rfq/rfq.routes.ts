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

// Apply auth to all routes
router.use(protect);

// ✅ CRITICAL: Static routes FIRST
router.get("/vendor", requireRole(UserRole.VENDOR), getVendorRFQs);
router.get("/buyer", requireRole(UserRole.BUYER), getBuyerRFQs);
router.post("/", requireRole(UserRole.BUYER), createRFQ);

// ✅ Dynamic routes LAST
router.get("/:id", getRFQById);
router.patch("/:id/status", updateRFQStatus);
router.patch("/:id/respond", respondToRFQ);

export default router;