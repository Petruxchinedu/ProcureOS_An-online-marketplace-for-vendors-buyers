import { Router } from "express";
import { protect } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";
import {
  getDashboardStats,
  getAllUsers,
  getAllRFQs,
  getAllOrders,
  getAllOrganizations,
  getRevenueAnalytics,
  getRFQDetails,
  updateUserStatus
} from "./admin.controller.js";

const router = Router();

// All admin routes require ADMIN role
router.use(protect);
router.use(requireRole(UserRole.ADMIN));

// Dashboard & Analytics
router.get("/dashboard/stats", getDashboardStats);
router.get("/analytics/revenue", getRevenueAnalytics);

// Entity Management
router.get("/users", getAllUsers);
router.get("/rfqs", getAllRFQs);
router.get("/rfqs/:id", getRFQDetails);
router.get("/orders", getAllOrders);
router.get("/organizations", getAllOrganizations);

// User Management
router.patch("/users/:userId/status", updateUserStatus);

export default router;