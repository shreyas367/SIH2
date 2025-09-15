"use client";

import { useEffect, useState } from "react";

interface Medicine {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  pharmacy: string;
}

export default function PharmacyUpdates() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    fetch("/api/pharmacy/medicines")
      .then(res => res.json())
      .then(data => setMedicines(data));
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20, minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", color: "#2a6db3", marginBottom: 25 }}>Pharmacy Updates</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {medicines.map((med) => (
          <div
            key={med._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              borderRadius: 12,
              backgroundColor: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              borderLeft: `5px solid ${med.quantity > 0 ? "#2a6db3" : "#ff5757"}`,
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 5 }}>{med.name}</h2>
              <p style={{ color: "#666", margin: 0 }}>
                Pharmacy: {med.pharmacy} | Price: {med.quantity > 0 ? `₹${med.price}` : "N/A"}
              </p>
            </div>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                backgroundColor: med.quantity > 0 ? "#2a6db3" : "#ff5757",
                color: "white",
                fontWeight: 500,
              }}
            >
              {med.quantity > 0 ? "Available" : "Out of Stock"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
