"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rfq_controller_js_1 = require("./rfq.controller.js");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const requireRole_js_1 = require("../../middlewares/requireRole.js");
const user_types_js_1 = require("../users/user.types.js");
const router = (0, express_1.Router)();
// Apply auth to ALL routes
router.use(requireAuth_js_1.protect);
/**
 * ✅ CRITICAL ORDER:
 * Static/named routes MUST be defined BEFORE dynamic /:id routes
 * Otherwise Express will match "/vendor" as if it's an ID parameter
 */
// 1. STATIC ROUTES FIRST (specific paths)
router.get("/vendor", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), rfq_controller_js_1.getVendorRFQs);
router.get("/buyer", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.BUYER), rfq_controller_js_1.getBuyerRFQs);
router.post("/", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.BUYER), rfq_controller_js_1.createRFQ);
// 2. DYNAMIC ROUTES LAST (parameterized paths)
router.get("/:id", rfq_controller_js_1.getRFQById);
router.patch("/:id/status", rfq_controller_js_1.updateRFQStatus);
router.patch("/:id/respond", rfq_controller_js_1.respondToRFQ);
exports.default = router;
