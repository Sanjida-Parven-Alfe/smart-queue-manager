import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import ActivityLog from "@/models/ActivityLog"; // Activity model lagbe
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { staffId } = await req.json();

    // 1. Queue theke shobcheye purano appointment neya (First in, First out)
    const nextInQueue = await Appointment.findOne({ status: "Waiting" }).sort({ startTime: 1 });

    if (!nextInQueue) {
      return NextResponse.json({ message: "No one in queue" }, { status: 404 });
    }

    // 2. Assign kora
    nextInQueue.staffId = staffId;
    nextInQueue.status = "Scheduled";
    await nextInQueue.save();

    // 3. Activity Log create kora
    await ActivityLog.create({
      action: `Appointment for "${nextInQueue.customerName}" assigned to staff.`,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true, data: nextInQueue });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}