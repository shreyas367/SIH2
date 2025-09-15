"use client";
import { useState, useEffect } from "react";
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
  Calendar,
  Heart,
  Shield,
  Users,
  AlertTriangle,
  Globe,
} from "lucide-react";

export default function PatientDashboard() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi" | "pa">("en");

  // Translations
  const t = {
    en: {
      welcome: "Welcome, Patient",
      subtitle: "Your health at your fingertips",
      dashboard: "Dashboard",
      governmentSchemes: "Government Schemes",
      logout: "Logout",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      healthScore: "Health Score",
      nextAppointment: "Next Appointment",
      activeMedications: "Active Medications",
      emergencySOS: "Emergency SOS",
      callNow: "Call Now",
      aiSymptomTracker: "AI Symptom Tracker",
      howAreYouFeeling: "How are you feeling today?",
      good: "Good",
      okay: "Okay",
      unwell: "Unwell",
      startSymptomAssessment: "Start Symptom Assessment",
      upcomingAppointments: "Upcoming Appointments",
      cardiologist: "Cardiologist",
      videoCall: "Video Call",
      join: "Join",
      generalPhysician: "General Physician",
      inPerson: "In-person",
      directions: "Directions",
      familyHealthProfiles: "Family Health Profiles",
      wife: "Wife",
      lastCheckup: "Last checkup: 2 weeks ago",
      healthy: "Healthy",
      son: "Son",
      vaccinationDue: "Vaccination due",
      attentionNeeded: "Attention Needed",
      quickActions: "Quick Actions",
      bookAppointment: "Book Appointment",
      medications: "Medications",
      reports: "Reports",
      ayushmanBharat: "Ayushman Bharat",
      coverageActive: "Coverage Active",
      available: "₹5,00,000 available",
      viewBenefits: "View Benefits",
      healthAlerts: "Health Alerts",
      fluSeasonAlert: "Flu Season Alert",
      considerVaccination: "Consider vaccination",
      checkupReminder: "Checkup Reminder",
      annualHealthScreening: "Annual health screening due",
      disclaimer: "⚠ This platform gives general guidance only. Consult a doctor for advice.",
    },
    hi: {
      welcome: "रोगी का स्वागत",
      subtitle: "आपका स्वास्थ्य आपकी उंगलियों पर",
      dashboard: "डैशबोर्ड",
      governmentSchemes: "सरकारी योजनाएं",
      logout: "लॉग आउट",
      lightMode: "लाइट मोड",
      darkMode: "डार्क मोड",
      healthScore: "स्वास्थ्य स्कोर",
      nextAppointment: "अगली अपॉइंटमेंट",
      activeMedications: "सक्रिय दवाएं",
      emergencySOS: "आपातकालीन SOS",
      callNow: "अभी कॉल करें",
      aiSymptomTracker: "AI लक्षण ट्रैकर",
      howAreYouFeeling: "आज आप कैसा महसूस कर रहे हैं?",
      good: "अच्छा",
      okay: "ठीक",
      unwell: "बीमार",
      startSymptomAssessment: "लक्षण मूल्यांकन शुरू करें",
      upcomingAppointments: "आगामी अपॉइंटमेंट",
      cardiologist: "हृदय रोग विशेषज्ञ",
      videoCall: "वीडियो कॉल",
      join: "जुड़ें",
      generalPhysician: "सामान्य चिकित्सक",
      inPerson: "व्यक्तिगत",
      directions: "दिशा-निर्देश",
      familyHealthProfiles: "पारिवारिक स्वास्थ्य प्रोफाइल",
      wife: "पत्नी",
      lastCheckup: "अंतिम जांच: 2 सप्ताह पहले",
      healthy: "स्वस्थ",
      son: "बेटा",
      vaccinationDue: "टीकाकरण बकाया",
      attentionNeeded: "ध्यान आवश्यक",
      quickActions: "त्वरित कार्य",
      bookAppointment: "अपॉइंटमेंट बुक करें",
      medications: "दवाएं",
      reports: "रिपोर्ट",
      ayushmanBharat: "आयुष्मान भारत",
      coverageActive: "कवरेज सक्रिय",
      available: "₹5,00,000 उपलब्ध",
      viewBenefits: "लाभ देखें",
      healthAlerts: "स्वास्थ्य अलर्ट",
      fluSeasonAlert: "फ्लू सीजन अलर्ट",
      considerVaccination: "टीकाकरण पर विचार करें",
      checkupReminder: "जांच अनुस्मारक",
      annualHealthScreening: "वार्षिक स्वास्थ्य जांच बकाया",
      disclaimer: "⚠ यह प्लेटफॉर्म केवल सामान्य मार्गदर्शन देता है। सलाह के लिए डॉक्टर से परामर्श करें।",
    },
    pa: {
      welcome: "ਮਰੀਜ਼ ਦਾ ਸਵਾਗਤ",
      subtitle: "ਤੁਹਾਡੀ ਸਿਹਤ ਤੁਹਾਡੀਆਂ ਉਂਗਲਾਂ 'ਤੇ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      governmentSchemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      logout: "ਲੌਗ ਆਉਟ",
      lightMode: "ਲਾਈਟ ਮੋਡ",
      darkMode: "ਡਾਰਕ ਮੋਡ",
      healthScore: "ਸਿਹਤ ਸਕੋਰ",
      nextAppointment: "ਅਗਲੀ ਮੁਲਾਕਾਤ",
      activeMedications: "ਸਰਗਰਮ ਦਵਾਈਆਂ",
      emergencySOS: "ਐਮਰਜੈਂਸੀ SOS",
      callNow: "ਹੁਣ ਕਾਲ ਕਰੋ",
      aiSymptomTracker: "AI ਲੱਛਣ ਟਰੈਕਰ",
      howAreYouFeeling: "ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?",
      good: "ਚੰਗਾ",
      okay: "ਠੀਕ",
      unwell: "ਬੀਮਾਰ",
      startSymptomAssessment: "ਲੱਛਣ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ",
      upcomingAppointments: "ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ",
      cardiologist: "ਦਿਲ ਦਾ ਡਾਕਟਰ",
      videoCall: "ਵੀਡੀਓ ਕਾਲ",
      join: "ਜੁੜੋ",
      generalPhysician: "ਆਮ ਡਾਕਟਰ",
      inPerson: "ਵਿਅਕਤੀਗਤ",
      directions: "ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼",
      familyHealthProfiles: "ਪਰਿਵਾਰਕ ਸਿਹਤ ਪ੍ਰੋਫਾਈਲ",
      wife: "ਪਤਨੀ",
      lastCheckup: "ਆਖਰੀ ਜਾਂਚ: 2 ਹਫ਼ਤੇ ਪਹਿਲਾਂ",
      healthy: "ਸਿਹਤਮੰਦ",
      son: "ਪੁੱਤਰ",
      vaccinationDue: "ਟੀਕਾਕਰਣ ਬਕਾਇਆ",
      attentionNeeded: "ਧਿਆਨ ਲੋੜੀਂਦਾ",
      quickActions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
      bookAppointment: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
      medications: "ਦਵਾਈਆਂ",
      reports: "ਰਿਪੋਰਟਾਂ",
      ayushmanBharat: "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ",
      coverageActive: "ਕਵਰੇਜ ਸਰਗਰਮ",
      available: "₹5,00,000 ਉਪਲਬਧ",
      viewBenefits: "ਲਾਭ ਵੇਖੋ",
      healthAlerts: "ਸਿਹਤ ਅਲਰਟ",
      fluSeasonAlert: "ਫਲੂ ਸੀਜ਼ਨ ਅਲਰਟ",
      considerVaccination: "ਟੀਕਾਕਰਣ ਬਾਰੇ ਸੋਚੋ",
      checkupReminder: "ਜਾਂਚ ਰਿਮਾਈਂਡਰ",
      annualHealthScreening: "ਸਾਲਾਨਾ ਸਿਹਤ ਸਕ੍ਰੀਨਿੰਗ ਬਕਾਇਆ",
      disclaimer: "⚠ ਇਹ ਪਲੇਟਫਾਰਮ ਸਿਰਫ਼ ਆਮ ਮਾਰਗਦਰਸ਼ਨ ਦਿੰਦਾ ਹੈ। ਸਲਾਹ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।",
    },
  } as const;

  const TT = t[currentLanguage];

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  // Load theme and language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("theme") === "dark") {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
      const savedLanguage = localStorage.getItem("language") as "en" | "hi" | "pa";
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  // Save language to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">🏥 Nabha Healthcare</h1>
        </div>
        <div className="flex-1 p-4 space-y-3">
          <button
            onClick={() => router.push("/dashboard/patient")}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> {TT.dashboard}
          </button>
          <button
            onClick={() => router.push("/schemes")}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            <Landmark className="w-5 h-5" /> {TT.governmentSchemes}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" /> {TT.logout}
          </button>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          {/* Language Selector */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Globe className="w-4 h-4" />
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value as "en" | "hi" | "pa")}
              className="bg-transparent text-sm font-medium flex-1 outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
          </div>
          <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 border rounded-lg w-full">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? TT.lightMode : TT.darkMode}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">{TT.welcome}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{TT.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              P
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Last login: Today</span>
          </div>
        </header>

        {/* Health Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">{TT.healthScore}</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">85%</p>
              </div>
              <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{TT.nextAppointment}</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Today 3:00 PM</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">{TT.activeMedications}</p>
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">3</p>
              </div>
              <Pill className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">{TT.emergencySOS}</p>
                <button
                  onClick={() => router.push("/dashboard/patient/video")}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm"
                >
                  <PhoneCall className="h-4 w-4 inline mr-2" />
                  {TT.callNow}
                </button>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Symptom Checker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Heart className="h-5 w-5 text-blue-600" />
                  {TT.aiSymptomTracker}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">{TT.howAreYouFeeling}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-sm border hover:bg-blue-100 dark:border-blue-700 cursor-pointer">
                      😊 {TT.good}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm border hover:bg-yellow-100 dark:border-yellow-700 cursor-pointer">
                      😐 {TT.okay}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm border hover:bg-red-100 dark:border-red-700 cursor-pointer">
                      😷 {TT.unwell}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/dashboard/patient/chatbox")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  {TT.startSymptomAssessment}
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  {TT.upcomingAppointments}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-semibold">DS</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Sarah Smith</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{TT.cardiologist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900 dark:text-white">Today 3:00 PM</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {TT.videoCall}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/dashboard/patient/video")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm"
                  >
                    <Video className="h-4 w-4 inline mr-1" />
                    {TT.join}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-semibold">RK</span>
                    </div>
                    <div>
                      <p className="font-medium">Dr. Raj Kumar</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{TT.generalPhysician}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900 dark:text-white">Tomorrow 10:00 AM</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600">
                      {TT.inPerson}
                    </span>
                  </div>
                  <button
                    onClick={() => router.push("/dashboard/patient/clinics")}
                    className="border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {TT.directions}
                  </button>
                </div>
              </div>
            </div>

            {/* Family Health Profiles */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Users className="h-5 w-5 text-blue-600" />
                  {TT.familyHealthProfiles}
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-semibold">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Jane Doe ({TT.wife})</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{TT.lastCheckup}</p>
                    </div>
                  </div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {TT.healthy}
                  </span>
                </div>

                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs font-semibold">AD</span>
                    </div>
                    <div>
                      <p className="font-medium">Alex Doe ({TT.son})</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{TT.vaccinationDue}</p>
                    </div>
                  </div>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    {TT.attentionNeeded}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold">{TT.quickActions}</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => router.push("/dashboard/patient/video")}
                  className="h-20 flex flex-col items-center justify-center rounded-lg border hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <Video className="h-6 w-6 mb-2" />
                  <span className="text-xs">{TT.videoCall}</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/patient/video")}
                  className="h-20 flex flex-col items-center justify-center rounded-lg border hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-xs">{TT.bookAppointment}</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/patient/pharmacy")}
                  className="h-20 flex flex-col items-center justify-center rounded-lg border hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <Pill className="h-6 w-6 mb-2" />
                  <span className="text-xs">{TT.medications}</span>
                </button>
                <button
                  onClick={() => router.push("/dashboard/patient/records")}
                  className="h-20 flex flex-col items-center justify-center rounded-lg border hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-xs">{TT.reports}</span>
                </button>
              </div>
            </div>

            {/* Government Schemes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Shield className="h-5 w-5 text-blue-600" />
                  {TT.ayushmanBharat}
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="p-3 rounded-lg border bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                  <p className="text-sm font-medium">{TT.coverageActive}</p>
                  <p className="text-xs opacity-90">{TT.available}</p>
                </div>
                <button
                  onClick={() => router.push("/schemes")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
                >
                  {TT.viewBenefits}
                </button>
              </div>
            </div>

            {/* Predictive Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  {TT.healthAlerts}
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="p-3 rounded-lg border bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
                  <p className="text-sm font-medium">{TT.fluSeasonAlert}</p>
                  <p className="text-xs opacity-90">{TT.considerVaccination}</p>
                </div>
                <div className="p-3 rounded-lg border bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                  <p className="text-sm font-medium">{TT.checkupReminder}</p>
                  <p className="text-xs opacity-90">{TT.annualHealthScreening}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
          {TT.disclaimer}
        </footer>
      </main>
    </div>
  );
}