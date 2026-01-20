"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    // 1. Try to get token from Authorization Header or Cookies
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.startsWith("Bearer "))
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        // 2. Verify Token (Note the ! to tell TS the secret exists)
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // 3. Attach standard payload to req.user
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            organizationId: decoded.organizationId
        };
        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
};
exports.authorize = authorize;
