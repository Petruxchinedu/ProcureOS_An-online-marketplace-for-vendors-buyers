import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../modules/users/user.model";
import { OrganizationModel } from "../modules/organizations/organization.model";
import { UserRole } from "../modules/users/user.types";
import { OrganizationType } from "../modules/organizations/organization.types";
import { sendEmail } from "../utils/mailer";
import { AuthRequest } from "./auth.middleware";

/** HELPERS */
const generateToken = (): string => crypto.randomBytes(32).toString("hex");
const tokenExpiry = (minutes: number): Date => new Date(Date.now() + minutes * 60 * 1000);

/** REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, organizationName, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already in use" });

    const organization = await OrganizationModel.create({
      name: organizationName || `${email.split("@")[0]}'s Account`,
      type: role === UserRole.BUYER ? OrganizationType.BUYER : OrganizationType.VENDOR,
    });

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = generateToken();

    await UserModel.create({
      email,
      passwordHash,
      role,
      organizationId: organization._id,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: tokenExpiry(60),
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verifyUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<h2>Welcome to Bulk-Buy</h2><p>Please verify your email to activate.</p><a href="${verifyUrl}">Verify Email</a>`,
    });

    return res.status(201).json({ message: "Registration successful. Check your email." });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/** LOGIN */

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+passwordHash");

    // Unified check: If user missing OR password wrong, send 401
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, organizationId: user.organizationId },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

/** GET CURRENT USER */
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findById(req.user.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user data" });
  }
};
/** VERIFY EMAIL */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      return res.status(400).json({ message: "Token is required" });
    }

    const user = await UserModel.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    }).select("+emailVerificationToken +emailVerificationExpires");

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/** FORGOT PASSWORD */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    // Security tip: always return success even if user doesn't exist to prevent email harvesting
    if (!user) return res.json({ message: "If account exists, reset link sent." });

    const token = generateToken();
    user.passwordResetToken = token;
    user.passwordResetExpires = tokenExpiry(30); // 30 mins
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `<h2>Password Reset</h2><p>Click below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
    });

    return res.json({ message: "Reset link sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
/**
 * RESET PASSWORD
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // 1. Find user by token and check if token hasn't expired
    const user = await UserModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetToken +passwordResetExpires +passwordHash");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(password, salt);

    // 3. Clear the reset fields so the token can't be used again
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};