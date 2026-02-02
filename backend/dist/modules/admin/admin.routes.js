"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireAuth_js_1 = require("../../middlewares/requireAuth.js");
const requireRole_js_1 = require("../../middlewares/requireRole.js");
const user_types_js_1 = require("../users/user.types.js");
const admin_controller_js_1 = require("./admin.controller.js");
const router = (0, express_1.Router)();
// All admin routes require ADMIN role
router.use(requireAuth_js_1.protect);
router.use((0, requireRole_js_1.requireRole)(user_types_js_1.UserRole.ADMIN));
// Dashboard & Analytics
router.get("/dashboard/stats", admin_controller_js_1.getDashboardStats);
router.get("/analytics/revenue", admin_controller_js_1.getRevenueAnalytics);
// Entity Management
router.get("/users", admin_controller_js_1.getAllUsers);
router.get("/rfqs", admin_controller_js_1.getAllRFQs);
router.get("/rfqs/:id", admin_controller_js_1.getRFQDetails);
router.get("/orders", admin_controller_js_1.getAllOrders);
router.get("/organizations", admin_controller_js_1.getAllOrganizations);
// User Management
router.patch("/users/:userId/status", admin_controller_js_1.updateUserStatus);
exports.default = router;
