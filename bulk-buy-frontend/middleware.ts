import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

export function middleware(req: NextRequest) {
  // Try to get token from cookie or local storage (via header)
  const token = req.cookies.get("token")?.value || 
                req.headers.get("authorization")?.split(" ")[1];

  const protectedRoutes = ["/dashboard", "/vendor", "/buyer", "/admin"];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    // If no token, redirect to login
    if (!token) {
      console.log("⚠️  No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Decode JWT to get user role
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("🔐 Token payload:", { role: payload.role, path: req.nextUrl.pathname });
      
      // Admin routes protection - ONLY admins can access
      if (req.nextUrl.pathname.startsWith("/admin")) {
        if (payload.role !== "ADMIN") {
          console.warn("⚠️  Non-admin tried to access admin route:", payload.role);
          return NextResponse.redirect(new URL("/", req.url));
        }
      }

      // Vendor routes protection - ONLY vendors can access
      if (req.nextUrl.pathname.startsWith("/vendor")) {
        if (payload.role !== "VENDOR") {
          console.warn("⚠️  Non-vendor tried to access vendor route:", payload.role);
          return NextResponse.redirect(new URL("/", req.url));
        }
      }

      // Buyer routes protection - ONLY buyers can access
      if (req.nextUrl.pathname.startsWith("/buyer")) {
        if (payload.role !== "BUYER") {
          console.warn("⚠️  Non-buyer tried to access buyer route:", payload.role);
          return NextResponse.redirect(new URL("/", req.url));
        }
      }

    } catch (error) {
      // If token is invalid, redirect to login
      console.error("❌ Invalid token in middleware:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/vendor/:path*",
    "/buyer/:path*",
    "/admin/:path*"
  ]
};