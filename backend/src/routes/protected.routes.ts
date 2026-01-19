import { Router } from "express";
import { authenticate, authorize } from "../auth/auth.middleware";
import { UserRole } from "../modules/users/user.types";

const router = Router();

router.get(
  "/vendor-only",
  authenticate,
  authorize(UserRole.VENDOR),
  (_req, res) => {
    res.json({ message: "Vendor access granted" });
  }
);

export default router;
