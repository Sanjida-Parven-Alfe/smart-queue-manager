"use client";
import { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react"; // Icons for better UI

export default function AddStaff({ onStaffAdded }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    serviceType: "Doctor",
    status: "Available" 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Form reset kora
        setFormData({ name: "", serviceType: "Doctor", status: "Available" });
        
        // Parent component (page.js) ke janano je data update hoyeche
        if (onStaffAdded) {
          onStaffAdded();
        }
        
        alert("Success: Staff member has been added!");
      } else {
        alert("Error: " + (data.error || "Failed to add staff"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error! Please check if your server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-8 border border-zinc-200 rounded-3xl bg-white shadow-xl shadow-zinc-200/50 transition-all hover:shadow-2xl hover:shadow-zinc-200/60"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <UserPlus size={20} />
        </div>
        <h2 className="text-xl font-bold text-zinc-800 tracking-tight">Add New Staff</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1.5 ml-1">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Alfe Parven"
            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-400"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 mb-1.5 ml-1">Service Category</label>
          <select
            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 appearance-none cursor-pointer"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            required
          >
            <option value="Doctor">Doctor</option>
            <option value="Consultant">Consultant</option>
            <option value="Support Agent">Support Agent</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-4 mt-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
            loading 
              ? 'bg-zinc-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Adding to Database...
            </>
          ) : (
            "Register Staff Member"
          )}
        </button>
      </div>
    </form>
  );
}