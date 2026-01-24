import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const staffId = searchParams.get("staffId");
    const date = searchParams.get("date");

    let query = {};
    if (staffId) query.staffId = staffId;
    if (date) {
      const start = new Date(date);
      start.setHours(0,0,0,0);
      const end = new Date(date);
      end.setHours(23,59,59,999);
      query.startTime = { $gte: start, $lte: end };
    }

    const appointments = await Appointment.find(query).populate("staffId").sort({ startTime: 1 });
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Update/Edit/Cancel logic-er jonno Patch method:
export async function PATCH(req) {
  try {
    await dbConnect();
    const { id, status } = await req.json();
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}