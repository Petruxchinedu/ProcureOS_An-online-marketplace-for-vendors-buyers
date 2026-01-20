import { Router } from "express";
import { 
  createProduct, 
  getVendorProducts, 
  getAllProducts, 
  getProductById,
  getMyProducts, 
  deleteProduct,
  updateProduct
} from "./product.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { UserRole } from "../users/user.types.js";

const router = Router();
// 2. PROTECTED VENDOR ROUTES (Keep security here)
router.post("/", requireAuth, requireRole(UserRole.VENDOR) as any, createProduct);
router.get("/my-inventory", requireAuth, requireRole(UserRole.VENDOR) as any, getVendorProducts);
router.get("/vendor/my-products", requireAuth, getMyProducts);

// 1. PUBLIC ROUTES (Remove requireAuth so the 401 disappears)
router.get("/", getAllProducts); 
router.get("/:id", getProductById);
router.post("/", requireAuth, createProduct);
router.delete("/:id", requireAuth, deleteProduct);
router.put("/:id", requireAuth, updateProduct);

export default router;