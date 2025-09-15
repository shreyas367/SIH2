"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function HealthRecordsPage() {
  const router = useRouter();
  const patientIdRef = useRef<HTMLInputElement | null>(null);

  const [patientId, setPatientId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle From Date Change
  const handleFromDateChange = (value: string) => {
    setFromDate(value);

    // Reset To Date if it's before the new From Date
    if (toDate && value > toDate) {
      setToDate("");
    }

    if (toDate && value > toDate) {
      setDateError("From Date cannot be later than To Date");
    } else {
      setDateError("");
    }
  };

  // Handle To Date Change
  const handleToDateChange = (value: string) => {
    setToDate(value);

    if (fromDate && value < fromDate) {
      setDateError("To Date cannot be earlier than From Date");
    } else {
      setDateError("");
    }
  };

  const handleSearch = () => {
    // Validate Patient ID
    if (!patientId.trim()) {
      setError("Patient ID is required");

      // Scroll to and focus on the Patient ID field
      if (patientIdRef.current) {
        patientIdRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        patientIdRef.current.focus();
      }
      return;
    }

    // Validate Date Range
    if (dateError) {
      return;
    }

    setError("");
    setLoading(true);

    console.log("Searching:", { patientId, fromDate, toDate });

    // Simulate search delay
    setTimeout(() => {
      setLoading(false);
      console.log("Search completed!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* Home Button */}
        <button
          onClick={() => router.push("/dashboard/doctor")}
          className="p-2 rounded-full bg-green-600 hover:ring-4 hover:ring-green-400 transition-all duration-300 shadow-md"
          title="Go to Dashboard"
        >
          <Home className="w-5 h-5 text-white" />
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold tracking-wide">PATIENT RECORD</h1>
        <div className="w-10" />
      </nav>

      {/* Search Section */}
      <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
        {/* Page Heading */}
        <h2
          className="text-lg font-bold italic text-center mb-6 text-gray-800"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Search Patient Records
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Patient ID Input */}
          <div className="flex-1">
            <label className="block text-green-600 font-bold mb-1">
              Patient ID <span className="text-red-600">*</span>
            </label>
            <input
              ref={patientIdRef}
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className={`w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500
                          focus:outline-none hover:border-green-500 focus:border-green-500
                          hover:ring-2 focus:ring-2 hover:ring-green-500 focus:ring-green-500
                          transition-all duration-300
                          ${error ? "border-red-500" : "border-gray-300"} border`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* From Date Input */}
          <div className="flex-1">
            <label className="block text-green-600 font-bold mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="w-full px-4 py-2 rounded-md bg-white text-black
                         border border-gray-300
                         focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500
                         hover:border-green-500 hover:ring-2 hover:ring-green-500
                         transition-all duration-300
                         placeholder:text-black
                         [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          {/* To Date Input */}
          <div className="flex-1">
            <label className="block text-green-600 font-bold mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
              min={fromDate || undefined} // 🔹 Prevent selecting before From Date
              placeholder="dd-mm-yyyy"
              className="w-full px-4 py-2 rounded-md bg-white text-black
                         border border-gray-300
                         focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500
                         hover:border-green-500 hover:ring-2 hover:ring-green-500
                         transition-all duration-300
                         placeholder:text-black
                         [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>
        </div>

        {/* Date Error Message */}
        {dateError && (
          <p className="text-red-500 text-sm mt-2 text-center">{dateError}</p>
        )}

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSearch}
            disabled={loading || !!dateError}
            className={`px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300
                        ${
                          loading
                            ? "bg-green-600 text-white shadow-[0_0_15px_#22c55e] cursor-not-allowed"
                            : "bg-black text-white hover:bg-black hover:shadow-[0_0_12px_#000]"
                        }`}
            style={{ minWidth: "130px" }}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            <span>{loading ? "Searching..." : "Search"}</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
        <div className="text-gray-600 text-center py-6">
          {loading
            ? "Loading search results..."
            : "No records found. Please search using Patient ID or date range."}
        </div>
      </div>
    </div>
  );
}