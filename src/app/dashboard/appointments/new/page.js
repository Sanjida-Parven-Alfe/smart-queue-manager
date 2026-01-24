"use client";
import { useState } from "react";
import StaffSelector from "@/components/StaffSelector";

export default function NewAppointment() {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [customerName, setCustomerName] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border mt-10">
      <h2 className="text-xl font-bold mb-6">Book Appointment</h2>
      
      <div className="space-y-4">
        {/* Customer Name Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700">Customer Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-xl border border-zinc-200 mt-1"
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        {/* Staff Selector Component */}
        <StaffSelector 
          selectedStaff={selectedStaff} 
          setSelectedStaff={setSelectedStaff} 
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-4">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}