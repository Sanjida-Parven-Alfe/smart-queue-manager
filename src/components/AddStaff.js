"use client";
import { useState } from "react";

export default function AddStaff() {
  const [formData, setFormData] = useState({ name: "", serviceType: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Staff Added Successfully!");
      setFormData({ name: "", serviceType: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Add New Staff</h2>
      <input
        type="text"
        placeholder="Staff Name"
        className="w-full p-2 mb-2 border rounded"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <select
        className="w-full p-2 mb-4 border rounded"
        value={formData.serviceType}
        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
        required
      >
        <option value="">Select Service Type</option>
        <option value="Doctor">Doctor</option>
        <option value="Consultant">Consultant</option>
        <option value="Support Agent">Support Agent</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Add Staff
      </button>
    </form>
  );
}