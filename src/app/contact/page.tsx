// src/app/contact/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-6">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8"
      >
        Contact Us
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 space-y-4"
      >
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
          required
        />
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
          required
        />
        <motion.textarea
          whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl h-32 resize-none focus:outline-none"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Send Message
        </motion.button>
        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-center mt-3"
          >
            ✅ Message sent successfully!
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}
