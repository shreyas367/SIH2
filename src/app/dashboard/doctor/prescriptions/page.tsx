"use client";

import { useState } from "react";

export default function DoctorPrescriptions() {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    title: "",
    notes: "",
    fileUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error: " + errorData.error);
        return;
      }

      alert("Prescription uploaded!");
      setForm({ patientId: "", doctorId: "", title: "", notes: "", fileUrl: "" });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Upload Prescription
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              placeholder="Enter patient ID"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Doctor ID
            </label>
            <input
              type="text"
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              placeholder="Enter doctor ID"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Prescription title"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              File URL
            </label>
            <input
              type="text"
              name="fileUrl"
              value={form.fileUrl}
              onChange={handleChange}
              placeholder="Link to uploaded file"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition-colors"
          >
            Upload Prescription
          </button>
        </form>
      </div>
    </div>
  );
}
