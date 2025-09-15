// src/app/auth/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 2000); // form slides in after 2s
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        switch (data.role) {
          case "patient":
            router.push("/dashboard/patient");
            break;
          case "doctor":
            router.push("/dashboard/doctor");
            break;
          case "pharmacy":
            router.push("/dashboard/pharmacy");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/auth/login");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Welcome + Robot */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6"> Welcome to MedApp</h1>

        {/* Simple robot */}
        <div className="relative flex flex-col items-center">
          {/* Head */}
          <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mx-1" />
            <div className="w-3 h-3 bg-green-400 rounded-full mx-1" />
          </div>
          {/* Body */}
          <div className="w-24 h-32 bg-gray-600 rounded-lg mt-2 relative">
            {/* Arm animation */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 40 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-10 left-[-30px] w-20 h-6 bg-gray-500 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Sliding Login Form */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showForm ? 0 : "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white text-black shadow-2xl p-8 rounded-l-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
}
