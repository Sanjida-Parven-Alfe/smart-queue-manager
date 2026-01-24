"use client";
import { useState, useEffect } from "react";
import AddStaff from "@/components/AddStaff";
import { 
  Users, Calendar, Briefcase, LayoutDashboard, 
  RefreshCcw, Clock, CheckCircle, ListOrdered 
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("staff");
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Secure fetch logic to prevent JSON parse errors
  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/staff");
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      // Check if response is empty before parsing
      const text = await res.text();
      if (!text) {
        setStaffList([]);
        return;
      }

      const data = JSON.parse(text);
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Soft error notification for the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const renderContent = () => {
    if (activeTab === "staff") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Left Column: Form Section */}
          <div className="lg:col-span-4 sticky top-10">
            <AddStaff onStaffAdded={fetchStaff} />
          </div>

          {/* Right Column: List Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-3 text-xl">
                  <Users size={24} className="text-blue-600" /> 
                  Staff Directory
                </h3>
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  <span className="text-sm font-bold">{staffList.length} Registered</span>
                </div>
              </div>

              <div className="p-8">
                {loading ? (
                  <div className="flex flex-col items-center py-24 text-slate-400">
                    <RefreshCcw className="animate-spin mb-4 text-blue-500" size={40} />
                    <p className="font-medium animate-pulse">Syncing Database...</p>
                  </div>
                ) : staffList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {staffList.map((s) => (
                      <div 
                        key={s._id} 
                        className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-5 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                      >
                        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                          {s.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{s.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.serviceType}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <Users className="mx-auto text-slate-300 mb-4" size={56} />
                    <p className="text-slate-500 font-semibold text-lg">No staff members found.</p>
                    <p className="text-slate-400 text-sm">Use the form to add your first team member.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Placeholder for other tabs
    return (
      <div className="flex flex-col items-center justify-center py-48 bg-white rounded-[3rem] border border-slate-200 shadow-inner animate-in zoom-in-95 duration-500">
        <div className="p-6 bg-slate-50 rounded-full mb-6">
          <LayoutDashboard size={80} className="text-slate-200" />
        </div>
        <h2 className="text-2xl font-black text-slate-400 tracking-tight text-center">
          The <span className="text-blue-500 uppercase">{activeTab}</span> panel <br /> is being prepared.
        </h2>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Modern Dark/Light Hybrid */}
      <aside className="w-80 bg-white border-r border-slate-200 p-10 hidden md:flex flex-col h-screen sticky top-0 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center gap-4 mb-14 px-2 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-blue-200 group-hover:rotate-6 transition-transform">
            <Calendar size={26} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">QueuePro</span>
        </div>

        <nav className="space-y-3 flex-1">
          <NavItem icon={<LayoutDashboard size={22}/>} label="Dashboard" active={activeTab === "dash"} onClick={() => setActiveTab("dash")} />
          <NavItem icon={<Users size={22}/>} label="Staff Manager" active={activeTab === "staff"} onClick={() => setActiveTab("staff")} />
          <NavItem icon={<Briefcase size={22}/>} label="Services" active={activeTab === "service"} onClick={() => setActiveTab("service")} />
          <NavItem icon={<Calendar size={22}/>} label="Appointments" active={activeTab === "apt"} onClick={() => setActiveTab("apt")} />
        </nav>

        <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 mt-auto shadow-sm">
           <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 uppercase tracking-tighter">
             <div className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </div>
             Server Status: Active
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                Administrator Portal
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight capitalize mb-2">{activeTab}</h1>
              <p className="text-slate-500 font-medium text-lg">Real-time resource management and tracking.</p>
            </div>
            <button 
              onClick={fetchStaff}
              disabled={loading}
              className="group p-4 bg-white border border-slate-200 rounded-3xl hover:bg-slate-50 hover:border-blue-300 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              title="Sync Data"
            >
              <RefreshCcw size={24} className={`${loading ? "animate-spin" : "text-slate-600 group-hover:text-blue-600 transition-colors"}`} />
            </button>
          </header>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Reusable Sidebar NavItem
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] font-bold transition-all duration-300 group ${
        active 
          ? "bg-blue-600 text-white shadow-2xl shadow-blue-300 translate-x-2" 
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className={`${active ? "text-white" : "group-hover:text-blue-600 transition-colors"}`}>
        {icon}
      </span>
      <span className="text-[17px]">{label}</span>
    </button>
  );
}