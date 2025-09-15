"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Video,
  Bot,
  FileText,
  Pill,
  PhoneCall,
  MapPin,
  Landmark,
  LogOut,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

function DashboardCard({ icon, title, description, onClick, buttonText, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border 
                 hover:shadow-lg transition flex flex-col"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white">
        {icon}
      </div>
      <h2 className="mt-4 font-semibold text-blue-700 dark:text-blue-300">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
      <button
        onClick={onClick}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

export default function PatientDashboard() {
  const router = useRouter();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  const cards = [
    { icon: <Video className="w-6 h-6" />, title: "Video Consultation", description: "ਘਰ ਬੈਠੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ।", onClick: () => router.push("/dashboard/patient/video"), buttonText: "Start" },
    { icon: <Landmark className="w-6 h-6" />, title: "Gov Schemes", description: "Ayushman Bharat, Sarbat Sehat Bima ਆਦਿ।", onClick: () => router.push("/schemes"), buttonText: "View" },
    { icon: <Bot className="w-6 h-6" />, title: "AI Symptom Checker", description: "ਆਪਣੇ ਲੱਛਣ ਜਾਂਚੋ ਤੇ ਪਹਿਲਾ ਸੁਝਾਅ ਲਵੋ।", onClick: () => router.push("/dashboard/patient/chatbox"), buttonText: "Check" },
    { icon: <FileText className="w-6 h-6" />, title: "Health Records", description: "ਆਪਣੇ ਟੈਸਟ ਅਤੇ ਇਲਾਜ ਦੇ ਰਿਕਾਰਡ ਵੇਖੋ।", onClick: () => router.push("/dashboard/patient/records"), buttonText: "Open" },
    { icon: <Pill className="w-6 h-6" />, title: "Pharmacy Updates", description: "ਨਜ਼ਦੀਕੀ ਫਾਰਮੇਸੀ ਵਿੱਚ ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ ਵੇਖੋ।", onClick: () => router.push("/dashboard/patient/pharmacy"), buttonText: "Check" },
    { icon: <MapPin className="w-6 h-6" />, title: "Nearby Clinics", description: "ਨਭਾ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਵੇਖੋ।", onClick: () => router.push("/dashboard/patient/clinics"), buttonText: "Open" },
    { icon: <PhoneCall className="w-6 h-6" />, title: "Emergency Numbers", description: "ਐਮਬੁਲੈਂਸ 108, ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਤੇ ਡਾਕਟਰ।", onClick: () => router.push("/dashboard/patient/emergency"), buttonText: "Call" },
    { icon: <Landmark className="w-6 h-6" />, title: "Gov Schemes", description: "Ayushman Bharat, Sarbat Sehat Bima ਆਦਿ।", onClick: () => router.push("/schemes"), buttonText: "View" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">🏥 Nabha Healthcare</h1>
        </div>
        <div className="flex-1 p-4 space-y-3">
          <button onClick={() => router.push("/dashboard/patient")} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <User className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-red-600">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 border rounded-lg w-full">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">ਸਤ ਸ੍ਰੀ ਅਕਾਲ! (Welcome, Patient)</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your health at your fingertips</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">P</div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Last login: Today</span>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <DashboardCard key={i} {...card} index={i} />
          ))}
        </div>

        <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          ⚠️ This platform gives general guidance only. Consult a doctor for advice.
        </footer>
      </main>
    </div>
  );
}
