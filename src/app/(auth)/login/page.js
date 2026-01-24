"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e?.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/dashboard"); // Successful login-e Dashboard-e niye jabe
    } else {
      alert("Invalid credentials");
    }
  };

  const handleDemoLogin = () => {
    setEmail("admin@demo.com");
    setPassword("123456");
    // Shorthand: input set korar por login call kora
    setTimeout(() => handleLogin(), 100); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Manager</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-black text-white p-3 rounded hover:bg-gray-800">
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div>
        </div>

        <button 
          onClick={handleDemoLogin}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-medium"
        >
          Login with Demo Admin
        </button>
      </div>
    </div>
  );
}