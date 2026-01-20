import { Router, RequestHandler } from "express";
import { authenticate, authorize } from "../auth/auth.middleware.js";
import { UserRole } from "../modules/users/user.types.js";

const router = Router();

router.get(
  "/vendor-only",
  // Cast these to RequestHandler to satisfy Express's internal type check
  authenticate as RequestHandler,
  authorize(UserRole.VENDOR) as RequestHandler,
  (_req, res) => {
    res.json({ message: "Vendor access granted" });
  }
);

export default router;