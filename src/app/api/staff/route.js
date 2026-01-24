import dbConnect from "@/lib/db";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    // Fetch all staff and sort by newest first
    const staff = await Staff.find({}).sort({ createdAt: -1 });
    
    // Always return success: true and the data array
    return NextResponse.json({ success: true, data: staff }, { status: 200 });
  } catch (error) {
    console.error("Database Fetch Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Database connection failed" }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (!body.name || !body.serviceType) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const newStaff = await Staff.create(body);
    return NextResponse.json({ success: true, data: newStaff }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}