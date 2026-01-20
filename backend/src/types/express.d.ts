import "express";

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: "BUYER" | "VENDOR" | "ADMIN";
      organizationId: string;
    }

    interface Request {
      user?: User;
    }
  }
}
