import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import Prescription from "@/lib/models/Prescription";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// POST: create prescription (doctor)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { patientId, doctorId, title, notes, fileUrl } = body;

    if (!patientId || !doctorId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prescription = await Prescription.create({
      patientId: new mongoose.Types.ObjectId(patientId),
      doctorId: new mongoose.Types.ObjectId(doctorId),
      title,
      notes,
      fileUrl,
    });

    return NextResponse.json({ prescription }, { status: 201 });
  } catch (error) {
    console.error("Prescription upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: fetch prescriptions for logged-in patient
export async function GET(req: Request) {
  try {
    await dbConnect();
    // Get token from cookies
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch prescriptions only for this patient
    const prescriptions = await Prescription.find({ patientId: payload.id }).sort({ createdAt: -1 });

    return NextResponse.json(prescriptions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

