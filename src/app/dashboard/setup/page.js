"use client";
import { useState, useEffect } from "react";
import { Users, Briefcase, Plus, Clock, UserCheck } from "lucide-react";

export default function SetupPage() {
  const [staff, setStaff] = useState({ name: "", serviceType: "Doctor", status: "Available" });
  const [service, setService] = useState({ name: "", duration: 15, requiredStaffType: "Doctor" });

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/staff", {
      method: "POST",
      body: JSON.stringify(staff),
    });
    if (res.ok) alert("Staff added!");
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/services", {
      method: "POST",
      body: JSON.stringify(service),
    });
    if (res.ok) alert("Service created!");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Resource Management</h1>
        <p className="text-zinc-500">Setup your staff members and the services they provide.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Staff Management Card */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center gap-2 mb-6 text-blue-600">
            <Users size={24} />
            <h2 className="text-xl font-bold text-zinc-800">Staff Setup</h2>
          </div>
          <form onSubmit={handleStaffSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Staff Name</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Dr. Sarah"
                onChange={(e) => setStaff({...staff, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Staff Type</label>
                <select 
                  className="w-full p-3 rounded-xl border border-zinc-200 bg-white"
                  onChange={(e) => setStaff({...staff, serviceType: e.target.value})}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Support Agent">Support Agent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
                <select 
                  className="w-full p-3 rounded-xl border border-zinc-200 bg-white"
                  onChange={(e) => setStaff({...staff, status: e.target.value})}
                >
                  <option value="Available">Available</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition flex items-center justify-center gap-2">
              <Plus size={18} /> Add Staff Member
            </button>
          </form>
        </section>

        {/* Service Management Card */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center gap-2 mb-6 text-emerald-600">
            <Briefcase size={24} />
            <h2 className="text-xl font-bold text-zinc-800">Service Definition</h2>
          </div>
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Service Name</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. Weekly Check-up"
                onChange={(e) => setService({...service, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 text-zinc-400" size={16} />
                  <select 
                    className="w-full p-3 pl-10 rounded-xl border border-zinc-200 bg-white"
                    onChange={(e) => setService({...service, duration: Number(e.target.value)})}
                  >
                    <option value={15}>15 mins</option>
                    <option value={30}>30 mins</option>
                    <option value={60}>60 mins</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Required Staff</label>
                <select 
                  className="w-full p-3 rounded-xl border border-zinc-200 bg-white"
                  onChange={(e) => setService({...service, requiredStaffType: e.target.value})}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Support Agent">Support Agent</option>
                </select>
              </div>
            </div>
            <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
              <Plus size={18} /> Define Service
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}