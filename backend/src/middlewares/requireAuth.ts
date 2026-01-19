import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    (req as any).user = decoded;
    console.log("✅ AUTH SUCCESS: User verified");
    next();
  } catch (err: any) {
    console.error("❌ AUTH FAILED: JWT Error ->", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
};