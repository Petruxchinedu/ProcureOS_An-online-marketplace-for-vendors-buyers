import "express";

export type UserRole = "BUYER" | "VENDOR" | "ADMIN";

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: UserRole;
      organizationId?: string;
    }

    interface Request {
      user?: User;
    }
  }
}
