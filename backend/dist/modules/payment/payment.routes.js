"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_js_1 = require("./payment.controller.js");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const router = (0, express_1.Router)();
// Only authenticated users can pay
router.post("/create-checkout", requireAuth_js_1.requireAuth, payment_controller_js_1.createCheckoutSession);
exports.default = router;
