"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

let socket: any;

export default function DoctorDashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState<
    { id: number; name: string; status: string }[]
  >([]);
  const [showQueue, setShowQueue] = useState(false);

  const dashboardItems = [
    {
      title: "Video Consultations",
      description: "Start a new video consultation with patients.",
      link: "/video-call/new",
      icon: "📹",
      notifications: 0,
      isVideo: true,
    },
    {
      title: "Health Records",
      description: "Access and update patient health records.",
      link: "/dashboard/doctor/records",
      icon: "📑",
    },
    {
      title: "Prescriptions",
      description: "Write and manage prescriptions for patients.",
      link: "/dashboard/doctor/prescriptions",
      icon: "💊",
    },
  ];

  // Initialize Socket.IO and listen for events
  useEffect(() => {
    if (!socket) socket = io("/api/socket");

    // Receive full queue when dashboard mounts
    socket.on("queue-update", (queue: any[]) => {
      setPatients(queue);
    });

    // Patient started consultation
    socket.on("consultation-started", ({ patientId }: { patientId: number }) => {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patientId ? { ...p, status: "In Consultation" } : p
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCardClick = (item: any) => {
    if (item.isVideo) setShowQueue(!showQueue);
    else router.push(item.link);
  };

  const startConsultation = (patientId: number) => {
    const roomId = uuidv4();
    socket.emit("start-consultation", patientId); // notify server
    router.push(`/video-call/${roomId}`);
  };

  return (
    <div style={{ background: "linear-gradient(120deg, #0f2027, #203a43, #2c5364)", minHeight: "100vh", padding: "3rem", color: "white" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "bold", textAlign: "center" }}>👨‍⚕️ Doctor Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
        {dashboardItems.map((item, index) => (
          <div key={index} style={{
            background: "linear-gradient(135deg, #1d3557, #457b9d)",
            color: "white",
            padding: "2rem",
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            position: "relative"
          }}>
            <div onClick={() => handleCardClick(item)} style={{ width: "100%", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem" }}>{item.icon}</div>
              <h2 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>{item.title}</h2>
              <p style={{ textAlign: "center", fontSize: "0.9rem" }}>{item.description}</p>
              <button
                style={{ marginTop: "1rem", background: "#e63946", color: "white", border: "none", padding: "0.6rem 1.2rem", borderRadius: "10px", cursor: "pointer" }}
                onClick={(e) => { e.stopPropagation(); handleCardClick(item); }}
              >
                Open
              </button>
            </div>

            {item.isVideo && showQueue && (
              <div style={{ marginTop: "1rem", background: "#203a43", borderRadius: "12px", padding: "1rem", width: "100%" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>Patient Queue</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {patients.map((patient) => (
                    <li key={patient.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", borderBottom: "1px solid #457b9d", background: patient.status === "Waiting" ? "#203a43" : "#457b9d" }}>
                      <span>{patient.name}</span>
                      <span>{patient.status}</span>
                      {patient.status === "Waiting" && (
                        <button
                          style={{ background: "#e63946", color: "white", border: "none", borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer" }}
                          onClick={() => startConsultation(patient.id)}
                        >
                          Start
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
