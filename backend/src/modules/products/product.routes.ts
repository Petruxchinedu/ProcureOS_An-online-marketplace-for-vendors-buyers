import { Router } from "express";
import { 
  createProduct, 
  getVendorProducts, 
  getProductById,
  getAllProducts,
  getMyProducts,
  deleteProduct,
  updateProduct
} from "./product.controller.js";
import { protect } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();

/**
 * ✅ CRITICAL ROUTE ORDER:
 * 1. Most specific routes FIRST
 * 2. Dynamic routes (:id) LAST
 */

// =====================================
// VENDOR-SPECIFIC ROUTES (Protected)
// =====================================
router.get("/vendor/my-products", protect, requireRole(UserRole.VENDOR), getMyProducts);
router.get("/my-inventory", protect, requireRole(UserRole.VENDOR), getVendorProducts);
router.post("/", protect, requireRole(UserRole.VENDOR), createProduct);
router.put("/:id", protect, requireRole(UserRole.VENDOR), updateProduct);
router.delete("/:id", protect, requireRole(UserRole.VENDOR), deleteProduct);

// =====================================
// PUBLIC ROUTES (No auth required)
// =====================================
router.get("/", getAllProducts); // List all products

// =====================================
// DYNAMIC ROUTES (Must be LAST!)
// =====================================
router.get("/:id", getProductById); // Get single product by ID

export default router;