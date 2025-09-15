import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import {dbConnect} from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Generate JWT with role info
    const token = jwt.sign(
      { id: user._id, role: user.role,name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store in httpOnly cookie
    const response = NextResponse.json({ message: "Login successful", role: user.role });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
