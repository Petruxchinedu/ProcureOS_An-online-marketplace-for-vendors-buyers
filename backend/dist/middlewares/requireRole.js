"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (...roles) => {
    return (req, res, next) => {
        // Add "as any" or "as UserRole" to the role check to satisfy the compiler
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You do not have the required permissions"
            });
        }
        next();
    };
};
exports.requireRole = requireRole;
