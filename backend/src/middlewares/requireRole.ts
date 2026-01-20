// Open src/middlewares/requireRole.ts
import { Response, NextFunction } from "express";
import { AuthRequest, UserRole } from "../auth/auth.middleware.js";

export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Add "as any" or "as UserRole" to the role check to satisfy the compiler
    if (!req.user || !roles.includes(req.user.role as any)) {
      return res.status(403).json({ 
        message: "Forbidden: You do not have the required permissions" 
      });
    }
    next();
  };
};