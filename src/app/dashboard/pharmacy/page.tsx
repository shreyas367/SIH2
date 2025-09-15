"use client";

import { useState, useEffect } from "react";

export default function PharmacyDashboard() {
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/pharmacy/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMedicine = async () => {
    if (!medicineName || quantity <= 0 || price <= 0) {
      setError("All fields are required and must be valid");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pharmacy/add-medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: medicineName,
          quantity,
          price,
          pharmacy: "MyPharmacy",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const newMed = await res.json();
      setMedicines((prev) => [...prev, newMed]);

      setMedicineName("");
      setQuantity(0);
      setPrice(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "auto", padding: 20 }}>
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2a6db3",
          marginBottom: 30,
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Pharmacy Dashboard
      </h1>

      {/* Add Medicine Form */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 25,
          flexWrap: "wrap",
          background: "#eef6fc",
          padding: 20,
          borderRadius: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={{
            flex: 2,
            padding: 14,
            borderRadius: 10,
            border: "1px solid #cfd8e3",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: "1px solid #cfd8e3",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: "1px solid #cfd8e3",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <button
          onClick={handleAddMedicine}
          disabled={loading}
          style={{
            padding: "14px 26px",
            background: "linear-gradient(135deg, #2a6db3, #1c5599)",
            color: "white",
            borderRadius: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s",
            flex: "0 0 auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
        >
          {loading ? "Adding..." : "Add Medicine"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginBottom: 20, textAlign: "center" }}>{error}</p>}

      {/* Medicines List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {medicines.map((med) => (
          <div
            key={med._id}
            style={{
              padding: 18,
              borderRadius: 14,
              background: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "all 0.3s",
              position: "relative",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2a6db3" }}>
              {med.name}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}>
              <span>Qty: {med.quantity}</span>
              <span>₹{med.price}</span>
            </div>
            {med.quantity <= 5 && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#ff5757",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: 8,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Low Stock
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
