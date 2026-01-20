"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.getMe = exports.login = exports.register = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Added .js extensions to all local file imports
const user_model_js_1 = require("../modules/users/user.model.js");
const organization_model_js_1 = require("../modules/organizations/organization.model.js");
const user_types_js_1 = require("../modules/users/user.types.js");
const organization_types_js_1 = require("../modules/organizations/organization.types.js");
const mailer_js_1 = require("../utils/mailer.js");
/** HELPERS */
const generateToken = () => crypto_1.default.randomBytes(32).toString("hex");
const tokenExpiry = (minutes) => new Date(Date.now() + minutes * 60 * 1000);
/** REGISTER USER */
const register = async (req, res) => {
    try {
        const { email, password, organizationName, role } = req.body;
        const existingUser = await user_model_js_1.UserModel.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "Email already in use" });
        const organization = await organization_model_js_1.OrganizationModel.create({
            name: organizationName || `${email.split("@")[0]}'s Account`,
            type: role === user_types_js_1.UserRole.BUYER ? organization_types_js_1.OrganizationType.BUYER : organization_types_js_1.OrganizationType.VENDOR,
        });
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        const verificationToken = generateToken();
        await user_model_js_1.UserModel.create({
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
        await (0, mailer_js_1.sendEmail)({
            to: email,
            subject: "Verify your email",
            html: `<h2>Welcome to Bulk-Buy</h2><p>Please verify your email to activate.</p><a href="${verifyUrl}">Verify Email</a>`,
        });
        return res.status(201).json({ message: "Registration successful. Check your email." });
    }
    catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
/** LOGIN */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_js_1.UserModel.findOne({ email }).select("+passwordHash");
        // Unified check: If user missing OR password wrong, send 401
        if (!user || !(await bcryptjs_1.default.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (!user.isEmailVerified) {
            return res.status(403).json({ message: "Email not verified" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role, organizationId: user.organizationId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
/** GET CURRENT USER */
const getMe = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await user_model_js_1.UserModel.findById(req.user.userId).select("-passwordHash");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching user data" });
    }
};
exports.getMe = getMe;
/** VERIFY EMAIL */
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Token is required" });
        }
        const user = await user_model_js_1.UserModel.findOne({
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
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.verifyEmail = verifyEmail;
/** FORGOT PASSWORD */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await user_model_js_1.UserModel.findOne({ email });
        // Security tip: always return success even if user doesn't exist to prevent email harvesting
        if (!user)
            return res.json({ message: "If account exists, reset link sent." });
        const token = generateToken();
        user.passwordResetToken = token;
        user.passwordResetExpires = tokenExpiry(30); // 30 mins
        await user.save();
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
        await (0, mailer_js_1.sendEmail)({
            to: email,
            subject: "Reset your password",
            html: `<h2>Password Reset</h2><p>Click below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
        });
        return res.json({ message: "Reset link sent" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.forgotPassword = forgotPassword;
/**
 * RESET PASSWORD
 */
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ message: "Token and password are required" });
        }
        // 1. Find user by token and check if token hasn't expired
        const user = await user_model_js_1.UserModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() },
        }).select("+passwordResetToken +passwordResetExpires +passwordHash");
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }
        // 2. Hash the new password
        const salt = await bcryptjs_1.default.genSalt(12);
        user.passwordHash = await bcryptjs_1.default.hash(password, salt);
        // 3. Clear the reset fields so the token can't be used again
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return res.status(200).json({ message: "Password reset successful. You can now log in." });
    }
    catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.resetPassword = resetPassword;
