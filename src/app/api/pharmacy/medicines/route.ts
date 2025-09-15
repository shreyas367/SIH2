import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/lib/db"; // your Mongoose connection
import Medicine from "@/lib/models/Medicine";

export async function GET() {
  try {
    await dbConnect();
    const medicines = await Medicine.find({}); // fetch all
    return NextResponse.json(medicines, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
