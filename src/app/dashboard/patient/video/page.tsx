// src/app/dashboard/patient/video/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VideoConsultation() {
  const router = useRouter();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callActive, setCallActive] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState({ name: "Waiting for doctor...", specialty: "" });
  const [callStatus, setCallStatus] = useState("Ready to connect with a doctor");

  const goBack = () => {
    router.push("/dashboard/patient");
  };

  const startCall = (doctorName: string, specialty: string) => {
    if (callActive) {
      alert("You are already in a call. Please end the current call first.");
      return;
    }

    setCurrentDoctor({ name: doctorName, specialty });
    setCallStatus(`Calling ${doctorName}...`);

    // Simulate call connection after a delay
    setTimeout(() => {
      setCallActive(true);
      setCallStatus(`Connected to ${doctorName} - ${specialty}`);
    }, 2000);
  };

  const endCall = () => {
    if (!callActive) return;

    setCallStatus("Call ended");

    // Reset after a delay
    setTimeout(() => {
      setCallActive(false);
      setCallStatus("Ready to connect with a doctor");
      setCurrentDoctor({ name: "Waiting for doctor...", specialty: "" });
    }, 1500);
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    alert(videoEnabled ? "Video disabled" : "Video enabled");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    alert(audioEnabled ? "Audio disabled" : "Audio enabled");
  };

  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: "auto", 
      padding: 20,
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f7fd 0%, #e2effa 100%)"
    }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px 0",
        marginBottom: 30,
        borderBottom: "1px solid rgba(42, 109, 179, 0.2)"
      }}>
        <button 
          onClick={goBack}
          style={{
            backgroundColor: "#2a6db3",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 500,
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1c5599";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2a6db3";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h1 style={{ color: "#2a6db3", fontSize: "2rem", fontWeight: 600, textAlign: "center", flexGrow: 1 }}>
          Video Consultation
        </h1>
        <div></div> {/* Empty div for spacing */}
      </header>
      
      <div style={{ 
        textAlign: "center", 
        margin: "20px 0", 
        fontSize: "1.1rem", 
        color: callStatus.includes("ended") ? "#ff5757" : 
              callStatus.includes("Connected") ? "#4caf50" : "#2a6db3",
        fontWeight: 500 
      }}>
        {callStatus}
      </div>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: 20, 
        marginBottom: 30 
      }}>
        <div style={{ 
          backgroundColor: "#1c2330",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          height: 350,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}>
            <i className="fas fa-user" style={{ fontSize: "3rem", marginBottom: 15, color: "#2a6db3" }}></i>
            <p>Your video will appear here</p>
          </div>
          <div style={{
            position: "absolute",
            bottom: 15,
            left: 15,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "5px 15px",
            borderRadius: 20,
            fontSize: "0.9rem"
          }}>
            You (Patient)
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: "#1c2330",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          height: 350,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
        }}>
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}>
            <i className="fas fa-user-md" style={{ fontSize: "3rem", marginBottom: 15, color: "#2a6db3" }}></i>
            <p>Doctor's video will appear here</p>
          </div>
          <div style={{
            position: "absolute",
            bottom: 15,
            left: 15,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "5px 15px",
            borderRadius: 20,
            fontSize: "0.9rem"
          }}>
            {currentDoctor.name}
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: 20, 
        marginBottom: 30 
      }}>
        <button 
          onClick={toggleVideo}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            background: videoEnabled ? "#2a6db3" : "#666",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: "0 4px 10px rgba(42, 109, 179, 0.3)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(42, 109, 179, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(42, 109, 179, 0.3)";
          }}
        >
          <i className="fas fa-video"></i>
        </button>
        
        <button 
          onClick={toggleAudio}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            background: audioEnabled ? "#2a6db3" : "#666",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: "0 4px 10px rgba(42, 109, 179, 0.3)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(42, 109, 179, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(42, 109, 179, 0.3)";
          }}
        >
          <i className="fas fa-microphone"></i>
        </button>
        
        <button 
          onClick={endCall}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            background: "#ff5757",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: "0 4px 10px rgba(255, 87, 87, 0.3)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(255, 87, 87, 0.4)";
            e.currentTarget.style.background = "#e64444";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(255, 87, 87, 0.3)";
            e.currentTarget.style.background = "#ff5757";
          }}
        >
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>
      
      <div style={{ 
        background: "white",
        borderRadius: 12,
        padding: 25,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)"
      }}>
        <h2 style={{ color: "#2a6db3", fontSize: "1.5rem", marginBottom: 20, fontWeight: 600 }}>
          Available Doctors
        </h2>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 15, 
            background: "#f9f9f9",
            transition: "all 0.3s",
            cursor: "pointer"
          }}
          onClick={() => startCall("Dr. Sarah Johnson", "Cardiologist")}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#edf5ff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f9f9f9";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#2a6db3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginRight: 15
          }}>
            SJ
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 600, color: "#2a6db3" }}>Dr. Sarah Johnson</div>
            <div style={{ color: "#666", fontSize: "0.9rem" }}>Cardiologist</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5, fontSize: "0.85rem" }}>
              <span style={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                marginRight: 5, 
                background: "#4caf50" 
              }}></span>
              <span>Online</span>
            </div>
          </div>
          <button 
            style={{
              background: "#2a6db3",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: 5,
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#1c5599";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#2a6db3";
            }}
          >
            Call
          </button>
        </div>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 15, 
            background: "#f9f9f9",
            transition: "all 0.3s",
            cursor: "pointer"
          }}
          onClick={() => startCall("Dr. Michael Chen", "Neurologist")}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#edf5ff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f9f9f9";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#2a6db3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginRight: 15
          }}>
            MC
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 600, color: "#2a6db3" }}>Dr. Michael Chen</div>
            <div style={{ color: "#666", fontSize: "0.9rem" }}>Neurologist</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5, fontSize: "0.85rem" }}>
              <span style={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                marginRight: 5, 
                background: "#4caf50" 
              }}></span>
              <span>Online</span>
            </div>
          </div>
          <button 
            style={{
              background: "#2a6db3",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: 5,
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#1c5599";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#2a6db3";
            }}
          >
            Call
          </button>
        </div>
        
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 15, 
            background: "#f9f9f9",
            transition: "all 0.3s",
            cursor: "pointer"
          }}
          onClick={() => alert("This doctor is currently offline")}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#edf5ff";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f9f9f9";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#2a6db3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginRight: 15
          }}>
            ER
          </div>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 600, color: "#2a6db3" }}>Dr. Emily Rodriguez</div>
            <div style={{ color: "#666", fontSize: "0.9rem" }}>Pediatrician</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 5, fontSize: "0.85rem" }}>
              <span style={{ 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                marginRight: 5, 
                background: "#ccc" 
              }}></span>
              <span>Offline</span>
            </div>
          </div>
          <button 
            style={{
              background: "#ccc",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: 5,
              cursor: "not-allowed"
            }}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}