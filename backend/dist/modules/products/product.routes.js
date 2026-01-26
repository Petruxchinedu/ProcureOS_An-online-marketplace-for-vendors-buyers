"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_js_1 = require("./product.controller.js");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const requireRole_js_1 = require("../../middlewares/requireRole.js");
const user_types_js_1 = require("../users/user.types.js");
const router = (0, express_1.Router)();
// 2. PROTECTED VENDOR ROUTES (Keep security here)
router.post("/", requireAuth_js_1.protect, (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), product_controller_js_1.createProduct);
router.get("/my-inventory", requireAuth_js_1.protect, (0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.VENDOR), product_controller_js_1.getVendorProducts);
router.get("/vendor/my-products", requireAuth_js_1.protect, product_controller_js_1.getMyProducts);
// 1. PUBLIC ROUTES (Remove requireAuth so the 401 disappears)
router.get("/", product_controller_js_1.getAllProducts);
router.get("/:id", product_controller_js_1.getProductById);
router.post("/", requireAuth_js_1.protect, product_controller_js_1.createProduct);
router.delete("/:id", requireAuth_js_1.protect, product_controller_js_1.deleteProduct);
router.put("/:id", requireAuth_js_1.protect, product_controller_js_1.updateProduct);
exports.default = router;
