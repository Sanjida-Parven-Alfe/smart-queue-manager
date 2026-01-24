import dbConnect from "@/lib/db";
import Appointment from "@/models/Appointment";
import Staff from "@/models/Staff";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const staffMembers = await Staff.find({ status: 'Available' });
    
    // Prottek staff er ajker load check kora
    const staffWithLoad = await Promise.all(staffMembers.map(async (s) => {
      const count = await Appointment.countDocuments({
        staffId: s._id,
        startTime: { $gte: today },
        status: { $ne: 'Cancelled' }
      });
      return { ...s._doc, currentLoad: count };
    }));

    return NextResponse.json({ success: true, data: staffWithLoad });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}