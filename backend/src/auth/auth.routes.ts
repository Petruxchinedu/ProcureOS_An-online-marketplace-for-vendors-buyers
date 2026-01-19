import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe
} from "./auth.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authenticate, getMe);


export default router;
