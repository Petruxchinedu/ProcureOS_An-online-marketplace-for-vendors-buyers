import { Request, Response, NextFunction } from "express";

export const requireRole =
  (...roles: Array<"BUYER" | "VENDOR" | "ADMIN">) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
