// src/app/auth/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "pharmacy" | "admin";
}

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push(`/auth/login?email=${encodeURIComponent(form.email)}`);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-blue-200 px-4 overflow-hidden">
      {/* Floating blurred shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -top-20 right-1/3 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8 z-10"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6 text-blue-900"
        >
          Create Account
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {["Name", "Email", "Password"].map((field) => (
            <motion.div
              key={field}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="block text-sm font-medium mb-1 text-blue-900">{field}</label>
              <input
                type={field === "Password" ? "password" : field === "Email" ? "email" : "text"}
                placeholder={
                  field === "Name"
                    ? "Your name"
                    : field === "Email"
                    ? "you@example.com"
                    : "********"
                }
                value={
                  field === "Name"
                    ? form.name
                    : field === "Email"
                    ? form.email
                    : form.password
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field.toLowerCase()]: e.target.value,
                  })
                }
                required
                className="w-full px-3 py-2 border rounded-lg bg-white/30 text-blue-900 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </motion.div>
          ))}

          {/* Role dropdown */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="block text-sm font-medium mb-1 text-blue-900">Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as SignupForm["role"] })
              }
              className="w-full px-3 py-2 border rounded-lg bg-white/30 text-blue-900 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="admin">Admin</option>
            </select>
          </motion.div>

          {/* Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-600 text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
        </motion.form>

        {/* Login link with animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm mt-4 text-blue-900"
        >
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-teal-600 hover:underline"
          >
            Log in
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
