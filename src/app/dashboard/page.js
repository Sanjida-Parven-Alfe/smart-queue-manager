"use client";
import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle, ListOrdered } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, queue: 0 });
  const [staffLoad, setStaffLoad] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // API call kore data fetch korte hobe (Stats, Load, Logs)
    // fetchStats(), fetchStaffLoad(), fetchLogs()
  }, []);

  return (
    <div className="p-8 space-y-8 bg-zinc-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-zinc-900">System Overview</h1>

      {/* 7. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Today's Total" value={stats.total} icon={<Clock className="text-blue-500" />} />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle className="text-green-500" />} />
        <StatCard title="In Queue" value={stats.queue} icon={<ListOrdered className="text-amber-500" />} />
        <StatCard title="Staff Active" value={staffLoad.length} icon={<Users className="text-purple-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Staff Load Summary */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Staff Load Summary</h2>
          <div className="space-y-4">
            {staffLoad.map(staff => (
              <div key={staff.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{staff.name}</span>
                  <span className={staff.currentLoad >= 5 ? "text-red-500 font-bold" : "text-zinc-500"}>
                    {staff.currentLoad} / 5 {staff.currentLoad >= 5 ? "(Booked)" : "(OK)"}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${staff.currentLoad >= 5 ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: `${(staff.currentLoad / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Activity Log */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-zinc-800">Recent Activity Log</h2>
          <div className="space-y-4">
            {logs.slice(0, 5).map((log, i) => (
              <div key={i} className="flex gap-3 text-sm border-l-2 border-zinc-100 pl-4 py-1">
                <span className="text-zinc-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <p className="text-zinc-700">{log.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-zinc-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-zinc-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
      </div>
    </div>
  );
}