"use client";
import { useState, useEffect } from "react";
import { Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchAppointments();
  }, [filterDate]);

  const fetchAppointments = async () => {
    const res = await fetch(`/api/appointments?date=${filterDate}`);
    const data = await res.json();
    if (data.success) setAppointments(data.data);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchAppointments();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      case 'Waiting': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>
        <input 
          type="date" 
          className="p-2 border rounded-xl outline-none ring-2 ring-zinc-100"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-xs">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Staff</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {appointments.map((appt) => (
              <tr key={appt._id} className="hover:bg-zinc-50 transition">
                <td className="p-4 font-medium">{appt.customerName}</td>
                <td className="p-4">{appt.serviceName}</td>
                <td className="p-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center"><User size={14}/></div>
                  {appt.staffId?.name || "Queue"}
                </td>
                <td className="p-4 text-zinc-500">{new Date(appt.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(appt.status)}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => updateStatus(appt._id, 'Completed')} className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition" title="Complete"><CheckCircle size={18}/></button>
                  <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition" title="Cancel"><XCircle size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && <p className="p-10 text-center text-zinc-400">No appointments found for this date.</p>}
      </div>
    </div>
  );
}