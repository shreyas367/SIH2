// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET) as { role: string };

    const pathname = req.nextUrl.pathname;

    // Role-based access
    if (pathname.startsWith("/dashboard/patient") && decoded.role !== "patient") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/doctor") && decoded.role !== "doctor") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/pharmacy") && decoded.role !== "pharmacy") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Paths where middleware runs
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
