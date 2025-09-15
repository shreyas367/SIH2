"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import { 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  Stethoscope, 
  TrendingUp, 
  Bell,
  UserCheck,
  Pill,
  Activity,
  Heart,
  AlertTriangle,
  LogOut,
  Settings,
  User,
  Phone,
  MessageSquare
} from "lucide-react";

let socket: any;

export default function DoctorDashboard() {
  const router = useRouter();
  const [patients, setPatients] = useState<
    { id: number; name: string; status: string; condition?: string; time?: string }[]
  >([
    { id: 1, name: "John Doe", status: "In Progress", condition: "Routine Checkup", time: "Now" },
    { id: 2, name: "Sarah Miller", status: "Waiting", condition: "Follow-up Consultation", time: "10:30 AM" },
    { id: 3, name: "Raj Kumar", status: "Scheduled", condition: "Diabetes Management", time: "11:00 AM" },
    { id: 4, name: "Emma Wilson", status: "Waiting", condition: "New Patient", time: "11:30 AM" },
  ]);
  const [showQueue, setShowQueue] = useState(true);

  const dashboardItems = [
    {
      title: "Video Consultations",
      description: "Start a new video consultation with patients.",
      link: "/video-call/new",
      icon: Video,
      notifications: 0,
      isVideo: true,
    },
    {
      title: "Health Records",
      description: "Access and update patient health records.",
      link: "/dashboard/doctor/records",
      icon: FileText,
    },
    {
      title: "Prescriptions",
      description: "Write and manage prescriptions for patients.",
      link: "/dashboard/doctor/prescriptions",
      icon: Pill,
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
    socket.emit("start-consultation", patientId);
    router.push(`/video-call/${roomId}`);
  };

  const getPatientInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Waiting":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Scheduled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "In Consultation":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
      {/* Header with Doctor Icon */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Today's Patients</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{patients.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-700 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Appointments</p>
              <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">18</p>
            </div>
            <Calendar className="h-8 w-8 text-indigo-700 dark:text-indigo-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Video Calls</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">12</p>
            </div>
            <Video className="h-8 w-8 text-green-700 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Prescriptions</p>
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">31</p>
            </div>
            <FileText className="h-8 w-8 text-amber-700 dark:text-amber-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Patient Queue */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <Clock className="h-5 w-5 text-blue-600" /> Patient Queue & Appointments
              </h2>
              <button
                onClick={() => setShowQueue(!showQueue)}
                className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {showQueue ? "Hide Queue" : "Show Queue"}
              </button>
            </div>
            <div className="p-6 space-y-4">
              {patients.map((patient) => (
                <div key={patient.id} className={`flex items-center justify-between p-4 rounded-lg border ${
                  patient.status === "In Progress" 
                    ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" 
                    : "bg-gray-50 dark:bg-gray-900/40"
                } dark:border-gray-700`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        {getPatientInitials(patient.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{patient.condition}</p>
                    </div>
                  </div>
                  <div className="text-right mr-3">
                    <p className="font-medium text-gray-900 dark:text-white">{patient.time}</p>
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </div>
                  {patient.status === "Waiting" ? (
                    <button
                      onClick={() => startConsultation(patient.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
                    >
                      <Video className="h-4 w-4 inline mr-1" /> Start
                    </button>
                  ) : patient.status === "In Progress" ? (
                    <button
                      onClick={() => startConsultation(patient.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm"
                    >
                      <Video className="h-4 w-4 inline mr-1" /> Join Call
                    </button>
                  ) : patient.status === "Scheduled" ? (
                    <button
                      onClick={() => {}}
                      className="border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Calendar className="h-4 w-4 inline mr-1" /> View
                    </button>
                  ) : (
                    <button
                      onClick={() => {}}
                      className="border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Stethoscope className="h-4 w-4 inline mr-1" /> In Consultation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Recent Consultations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <FileText className="h-5 w-5 text-blue-600" /> Recent Consultations & Prescriptions
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 border rounded-lg dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <span className="text-xs font-semibold text-red-700 dark:text-red-300">AD</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Alice Davis</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hypertension Treatment</p>
                    </div>
                  </div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Diagnosis:</strong> Essential Hypertension</p>
                  <p><strong>Prescription:</strong> Amlodipine 5mg, Metoprolol 25mg</p>
                  <p><strong>Follow-up:</strong> 2 weeks</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">MJ</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Mike Johnson</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Respiratory Infection</p>
                    </div>
                  </div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</span>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Diagnosis:</strong> Upper Respiratory Tract Infection</p>
                  <p><strong>Prescription:</strong> Azithromycin 500mg, Paracetamol</p>
                  <p><strong>Follow-up:</strong> If symptoms persist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Analytics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 text-blue-600" /> Patient Analytics & Insights
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-medium text-blue-800 dark:text-blue-200">Most Common Conditions</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">1. Hypertension (32%)</p>
                  <p className="text-sm">2. Diabetes (28%)</p>
                  <p className="text-sm">3. Respiratory Issues (18%)</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-200">Patient Satisfaction</p>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">4.8/5</p>
                  <p className="text-sm text-green-700/80 dark:text-green-300/80">Based on 156 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => router.push("/video-call/new")}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                <Video className="h-4 w-4 inline mr-2" /> Start Video Call
              </button>
              <button
                onClick={() => router.push("/dashboard/doctor/prescriptions")}
                className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Pill className="h-4 w-4 inline mr-2" /> Write Prescription
              </button>
              <button
                onClick={() => router.push("/dashboard/doctor")}
                className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Calendar className="h-4 w-4 inline mr-2" /> Schedule Appointment
              </button>
              <button
                onClick={() => router.push("/dashboard/doctor/records")}
                className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FileText className="h-4 w-4 inline mr-2" /> Update Records
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">New patient appointment scheduled for tomorrow at 9:00 AM</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Prescription renewal request from David Smith</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-600"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Lab results ready for Sarah Johnson</p>
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Availability</h3>
            </div>
            <div className="p-6">
              <select className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600">
                <option>Available</option>
                <option>In Consultation</option>
                <option>On Break</option>
                <option>Offline</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
