import { NextRequest, NextResponse } from "next/server";
import Prescription from "@/lib/models/Prescription";
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import mongoose from "mongoose";

dbConnect();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token) as any;

  if (!decoded || decoded.role !== "patient") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = decoded.userId;

  // Convert to ObjectId to match patientId in DB
  const prescriptions = await Prescription.find({
    patientId: new mongoose.Types.ObjectId(userId),
  }).lean();

  return NextResponse.json(prescriptions, { status: 200 });
}
