import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../modules/users/user.types.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
    organizationId: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // 3. Attach standard payload to req.user
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      organizationId: decoded.organizationId
    };
    
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export const authorize = (...roles: UserRole[]) => 
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };