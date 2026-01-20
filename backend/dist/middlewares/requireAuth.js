"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // DEBUG: See what the backend is actually receiving
    console.log("🛡️ AUTH ATTEMPT - Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ AUTH FAILED: No Bearer token in header");
        return res.status(401).json({ message: "Unauthorized: Missing Token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // IMPORTANT: Ensure process.env.JWT_SECRET is exactly the same 
        // string used in your login/register controller!
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ AUTH SUCCESS: User verified");
        next();
    }
    catch (err) {
        console.error("❌ AUTH FAILED: JWT Error ->", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }
};
exports.requireAuth = requireAuth;
