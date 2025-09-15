"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

let socket: any;

interface Patient {
  id: number;
  name: string;
  status: string;
  roomId?: string;
}

export default function PatientQueue() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [added, setAdded] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [queue, setQueue] = useState<Patient[]>([]);

  useEffect(() => {
    if (!socket) socket = io("/api/socket");

    // Update queue whenever server emits
    socket.on("queue-update", (patients: Patient[]) => {
      setQueue(patients);
    });

    // Listen for consultation started
    socket.on(
      "consultation-started",
      ({ patientId, roomId }: { patientId: number; roomId: string }) => {
        if (patient && patient.id === patientId) {
          router.push(`/video-call/${roomId}`);
        }
      }
    );

    return () => {
      socket.off("queue-update");
      socket.off("consultation-started");
      socket.disconnect();
    };
  }, [patient, router]);

  const joinQueue = () => {
    if (!name) return alert("Enter your name");

    const id = Date.now(); // unique ID
    const newPatient: Patient = { id, name, status: "Waiting" };
    setPatient(newPatient);

    socket.emit("new-patient", newPatient); // send to server
    setAdded(true);
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#203a43",
        color: "white",
        padding: "2rem",
      }}
    >
      {!added ? (
        <>
          <h1>Join Video Consultation Queue</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              border: "none",
              marginRight: "0.5rem",
            }}
          />
          <button
            onClick={joinQueue}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "none",
              background: "#e63946",
              color: "white",
              cursor: "pointer",
            }}
          >
            Join Queue
          </button>
        </>
      ) : (
        <>
          <h2>✅ You are in the queue! Waiting for the doctor...</h2>
          <div
            style={{
              marginTop: "2rem",
              width: "100%",
              maxWidth: "400px",
              background: "#203a43",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Current Queue</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {queue.map((p) => (
                <li
                  key={p.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                    borderBottom: "1px solid #457b9d",
                    background: p.status === "Waiting" ? "#203a43" : "#457b9d",
                  }}
                >
                  <span>{p.name}</span>
                  <span>{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
