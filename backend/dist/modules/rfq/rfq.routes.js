"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rfq_controller_js_1 = require("./rfq.controller.js");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const requireRole_js_1 = require("../../middlewares/requireRole.js");
const user_types_js_1 = require("../users/user.types.js");
const router = (0, express_1.Router)();
// Apply requireAuth to all RFQ routes since they all require a session
router.use(requireAuth_js_1.protect);
/**
 * 1. STATIC/NAMED ROUTES (Specific)
 * These must be defined BEFORE dynamic routes like /:id
 */
// Vendor-specific endpoints
router.get("/vendor", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), rfq_controller_js_1.getVendorRFQs);
router.get("/v/all", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), rfq_controller_js_1.getVendorRFQs);
// Buyer-specific endpoints
router.get("/buyer", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.BUYER), rfq_controller_js_1.getBuyerRFQs);
router.get("/b/all", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.BUYER), rfq_controller_js_1.getBuyerRFQs);
router.post("/", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.BUYER), rfq_controller_js_1.createRFQ);
// 3. The dynamic ID route LAST
// Now, this only catches /api/rfq/ANY_ID, but NOT /api/rfq/list/...
router.get("/:id", rfq_controller_js_1.getRFQById);
router.patch("/:id/status", rfq_controller_js_1.updateRFQStatus);
router.patch("/:id/respond", rfq_controller_js_1.respondToRFQ);
exports.default = router;
