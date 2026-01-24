import AddStaff from "@/components/AddStaff";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Smart Appointment & Queue Manager
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your staff, services, and appointments efficiently.
          </p>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Instructions or Status */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Getting Started</h2>
            <ul className="space-y-3 text-blue-700">
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-sm font-bold">1</span>
                Connect your MongoDB in .env.local
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-sm font-bold">2</span>
                Add your first staff member using the form
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-sm font-bold">3</span>
                Check MongoDB Atlas for data verification
              </li>
            </ul>
          </div>

          {/* Right Side: Staff Form Component */}
          <div>
            <AddStaff />
          </div>
        </div>
      </main>
    </div>
  );
}