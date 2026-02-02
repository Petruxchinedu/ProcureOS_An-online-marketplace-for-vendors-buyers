"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_js_1 = require("./order.controller.js");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const requireRole_js_1 = require("../../middlewares/requireRole.js");
const user_types_js_1 = require("../users/user.types.js");
const router = (0, express_1.Router)();
router.use(requireAuth_js_1.protect);
router.post("/rfq/:rfqId/accept", order_controller_js_1.createOrderFromRFQ);
router.patch("/:orderId/fulfill", order_controller_js_1.markOrderFulfilled);
// Invoice routes - specific path first!
router.get("/invoice/rfq/:rfqId", (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), order_controller_js_1.getInvoiceByRFQId);
router.get("/:orderId/invoice", order_controller_js_1.getInvoice);
exports.default = router;
