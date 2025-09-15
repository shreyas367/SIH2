import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/lib/db"; // your Mongoose connection
import Medicine from "@/lib/models/Medicine";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, quantity, price, pharmacy } = await req.json();

    if (!name || !quantity || !price || !pharmacy) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newMedicine = await Medicine.create({ name, quantity, price, pharmacy });
    return NextResponse.json(newMedicine, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
