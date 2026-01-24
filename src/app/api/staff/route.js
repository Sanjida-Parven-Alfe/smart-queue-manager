import dbConnect from "@/lib/db";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newStaff = await Staff.create(body);
    return NextResponse.json({ success: true, data: newStaff }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const allStaff = await Staff.find({});
    return NextResponse.json({ success: true, data: allStaff });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}