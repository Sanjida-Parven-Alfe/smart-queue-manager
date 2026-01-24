"use client";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function StaffSelector({ selectedStaff, setSelectedStaff }) {
  const [staffList, setStaffList] = useState([]);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    fetch("/api/staff/load")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStaffList(data.data); // Syntax fixed here
      });
  }, []);

  const handleChange = (id) => {
    const selected = staffList.find((s) => s._id === id);
    if (selected && selected.currentLoad >= 5) {
      setWarning(`${selected.name} already has 5 appointments today. Appointment will go to Waiting Queue.`);
    } else {
      setWarning("");
    }
    setSelectedStaff(id);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-700 font-sans">Assign Staff</label>
      <select 
        className="w-full p-3 rounded-xl border border-zinc-200 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
        value={selectedStaff}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Select Staff</option>
        {staffList.map((s) => (
          <option key={s._id} value={s._id} disabled={s.status === 'On Leave'}>
            {s.name} ({s.currentLoad} / 5 appointments today)
          </option>
        ))}
      </select>

      {warning && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm animate-pulse">
          <AlertCircle size={16} />
          {warning}
        </div>
      )}
    </div>
  );
}