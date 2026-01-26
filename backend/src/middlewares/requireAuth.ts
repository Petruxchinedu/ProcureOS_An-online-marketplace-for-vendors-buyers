// backend/src/middlewares/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    organizationId?: string;
    role: string;
  };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // ⚡ Validate payload structure
    if (!payload.userId || !payload.role) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      userId: payload.userId,
      organizationId: payload.organizationId,
      role: payload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
