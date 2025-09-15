import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export function withRole(allowedRoles: string[], handler: any) {
  return async (req: Request) => {
    try {
      const token = req.headers.get("cookie")?.split("token=")[1];
      if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      const decoded: any = jwt.verify(token, JWT_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      return handler(req, decoded);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
