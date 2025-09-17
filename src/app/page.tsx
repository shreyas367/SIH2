// src/app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sun, Moon, Menu, User, Pill, Loader2, Heart, Stethoscope, Activity, MapPin, MessageSquare
} from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion, useAnimation, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Box, OrbitControls } from "@react-three/drei";

// ================= Hero 3D Background =================
function Hero3DBackground() {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Float rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]} position={[-2, 0, 0]}>
          <meshStandardMaterial color="#0ea5e9" />
        </Sphere>
      </Float>
      <Float rotationIntensity={0.5} floatIntensity={0.7} speed={2}>
        <Box args={[1.2, 1.2, 1.2]} position={[2, 0.5, 0]}>
          <meshStandardMaterial color="#10b981" />
        </Box>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

// ================= Feature Card =================
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link?: string;
}

function FeatureCard({ icon: Icon, title, description, link }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        scale={1.03}
        transitionSpeed={400}
        className="rounded-xl shadow-md border border-gray-200 dark:border-gray-300 bg-white dark:bg-gray-800 p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
      >
        <div
          className="flex flex-col items-center text-center gap-3"
          onClick={() => link && window.location.assign(link)}
        >
          <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm">{description}</p>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ================= Translations =================
const translations = {
  en: {
    nav: { home: "Home", about: "About", contact: "Contact", schemes: "Schemes", login: "Login", signup: "Sign Up" },
    hero: { title: "Healthcare for Everyone", desc: "Online healthcare services — Doctor Consultations, Prescriptions, and 24/7 Support", getStarted: "Get Started" },
    features: {
      appointments: "Doctor Appointments",
      emergency: "Emergency Doctor",
      medicines: "Medicines & Prescriptions",
      pharmacy: "Pharmacy Updates",
      labTests: "Online Lab Tests",
      healthTips: "Health Tips",
      chat: "Telemedicine Chat",
      clinics: "Nearby Clinics",
      symptomChecker: "AI Symptom Checker"
    },
    featuresDesc: {
      appointments: "Consult with a doctor online",
      emergency: "Consult emergency doctor online",
      medicines: "Manage medicines and records",
      pharmacy: "Check medicine availability",
      labTests: "Book lab tests and get results",
      healthTips: "Daily health tips and reminders",
      chat: "Chat securely with doctors",
      clinics: "Locate clinics or hospitals nearby",
      symptomChecker: "Check symptoms and get suggestions"
    },
    footer: "© {year} Nabha Healthcare | Rural Punjab Healthcare",
  },
  pa: {
    nav: { home: "ਮੁੱਖ ਸਫ਼ਾ", about: "ਬਾਰੇ", contact: "ਸੰਪਰਕ", schemes: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", login: "ਲੌਗਇਨ", signup: "ਰਜਿਸਟਰ" },
    hero: { title: "ਸਿਹਤ ਸਭ ਲਈ", desc: "Nabha ਦੇ ਪਿੰਡਾਂ ਲਈ ਆਨਲਾਈਨ ਸਿਹਤ ਸੇਵਾਵਾਂ — Doctor Consultations, Prescriptions, ਅਤੇ 24/7 Support", getStarted: "ਸ਼ੁਰੂ ਕਰੋ" },
    features: {
      appointments: "ਡਾਕਟਰ ਅਪਾਇੰਟਮੈਂਟ",
      emergency: "ਐਮਰਜੈਂਸੀ ਡਾਕਟਰ",
      medicines: "ਦਵਾਈਆਂ & ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ",
      pharmacy: "ਦਵਾਈ ਜਾਣਕਾਰੀ",
      labTests: "ਆਨਲਾਈਨ ਲੈਬ ਟੈਸਟ",
      healthTips: "ਸਿਹਤ ਟਿੱਪਸ",
      chat: "ਟੀਲੀਮੇਡੀਸਨ ਚੈਟ",
      clinics: "ਨੇੜੇ ਦੀਆਂ ਕਲਿਨਿਕਾਂ",
      symptomChecker: "AI Symptom Checker"
    },
    featuresDesc: {
      appointments: "Consult with a doctor online",
      emergency: "Consult emergency doctor online",
      medicines: "Manage medicines and records",
      pharmacy: "Check medicine availability",
      labTests: "Book lab tests and get results",
      healthTips: "Daily health tips and reminders",
      chat: "Chat securely with doctors",
      clinics: "Locate clinics or hospitals nearby",
      symptomChecker: "Check symptoms and get suggestions"
    },
    footer: "© {year} ਨਭਾ ਹੈਲਥਕੇਅਰ | Rural Punjab Healthcare",
  },
  hi: {
    nav: { home: "मुख पृष्ठ", about: "बारे में", contact: "संपर्क", schemes: "सरकारी योजनाएं", login: "लॉगिन", signup: "रजिस्टर" },
    hero: { title: "सभी के लिए स्वास्थ्य", desc: "ग्रामीण इलाकों के लिए ऑनलाइन स्वास्थ्य सेवाएँ — डॉक्टर परामर्श, प्रिस्क्रिप्शन, और 24/7 समर्थन", getStarted: "शुरू करें" },
    features: {
      appointments: "डॉक्टर अपॉइंटमेंट",
      emergency: "आपातकालीन डॉक्टर",
      medicines: "दवाइयाँ & प्रिस्क्रिप्शन",
      pharmacy: "फार्मेसी अपडेट",
      labTests: "ऑनलाइन लैब टेस्ट",
      healthTips: "स्वास्थ्य टिप्स",
      chat: "टेलीमेडिसिन चैट",
      clinics: "पास के क्लिनिक",
      symptomChecker: "एआई लक्षण जांच"
    },
    featuresDesc: {
      appointments: "ऑनलाइन डॉक्टर से परामर्श करें",
      emergency: "आपातकालीन डॉक्टर से परामर्श करें",
      medicines: "दवाइयों और रिकॉर्ड का प्रबंधन करें",
      pharmacy: "दवाओं की उपलब्धता जांचें",
      labTests: "लैब टेस्ट बुक करें और परिणाम प्राप्त करें",
      healthTips: "दैनिक स्वास्थ्य सुझाव और अनुस्मारक",
      chat: "डॉक्टरों के साथ सुरक्षित चैट करें",
      clinics: "पास के क्लिनिक या अस्पताल ढूंढें",
      symptomChecker: "लक्षण जांचें और सुझाव प्राप्त करें"
    },
    footer: "© {year} नाभा हेल्थकेयर | Rural Punjab Healthcare",
  }
};

// ================= Language selector =================
function LanguageSelector({ language, setLanguage }: { language: "en" | "pa" | "hi"; setLanguage: (lang: "en" | "pa" | "hi") => void }) {
  return (
    <div className="absolute top-4 right-6 flex gap-2 z-20">
      {["en", "pa", "hi"].map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang as "en" | "pa" | "hi")}
          className={`px-3 py-1 rounded ${language === lang ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ================= Navbar =================
const navLinksKeys = ["home", "about", "contact", "schemes", "login", "signup"] as const;

const routeOverrides: Record<string, string> = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
};

function NavLinks({ language, onClick }: { language: "en" | "pa" | "hi"; onClick?: () => void }) {
  return (
    <>
      {navLinksKeys.map((key) => (
        <Link
          key={key}
          href={routeOverrides[key] || `/${key}`}
          onClick={onClick}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {translations[language].nav[key]}
        </Link>
      ))}
    </>
  );
}

// ================= WhatsApp Groups Section =================
function WhatsAppGroupSection() {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Join Our WhatsApp Groups
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {/* Govt. Healthcare Schemes */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer">
            <img
              src="/govsc.jpg"
              alt="Govt Healthcare Schemes QR"
              className="w-40 h-40 object-contain"
            />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Govt. Healthcare Schemes
          </p>
        </div>
        {/* Vaccination Updates */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer">
            <img
              src="/WhatsApp Image 2025-09-16 at 04.22.32_22a0fd7f.jpg"
              alt="Vaccination Updates QR"
              className="w-40 h-40 object-contain"
            />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Vaccination Updates
          </p>
        </div>
        {/* Emergency / Ambulance Support */}
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer">
            <img
              src="/ambulance.jpg"
              alt="Emergency / Ambulance Support QR"
              className="w-40 h-40 object-contain"
            />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Emergency / Ambulance Support
          </p>
        </div>
      </div>
    </section>
  );
}

// ================= Main Home Page =================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "pa" | "hi">("en");

  useEffect(() => {
    const theme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900 dark:text-white relative bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      {/* Language selector */}
      <LanguageSelector language={language} setLanguage={setLanguage} />

      {/* Navbar */}
      <nav className="bg-white/90 dark:bg-gray-800/90 shadow-md fixed w-full z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
            ਨਭਾ ਹੈਲਥਕੇਅਰ
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLinks language={language} />
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 px-6 pb-4 flex flex-col gap-4">
            <NavLinks language={language} onClick={() => setMenuOpen(false)} />
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 text-center bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white relative overflow-hidden">
        <Hero3DBackground />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.hero.title}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-600 dark:text-gray-300">{t.hero.desc}</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.hero.getStarted}
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-3 border border-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            {t.nav.login}
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <FeatureCard icon={User} title={t.features.appointments} description={t.featuresDesc.appointments} link="/dashboard/patient/appointments" />
        <FeatureCard icon={Loader2} title={t.features.emergency} description={t.featuresDesc.emergency} link="/dashboard/patient/emergency" />
        <FeatureCard icon={Pill} title={t.features.medicines} description={t.featuresDesc.medicines} link="/dashboard/patient/records" />
        <FeatureCard icon={Heart} title={t.features.pharmacy} description={t.featuresDesc.pharmacy} link="/dashboard/patient/pharmacy" />
        <FeatureCard icon={Stethoscope} title={t.features.labTests} description={t.featuresDesc.labTests} link="/dashboard/patient/lab-tests" />
        <FeatureCard icon={Activity} title={t.features.healthTips} description={t.featuresDesc.healthTips} link="/dashboard/patient/health-tips" />
        <FeatureCard icon={MessageSquare} title={t.features.chat} description={t.featuresDesc.chat} link="/dashboard/patient/chat" />
        <FeatureCard icon={MapPin} title={t.features.clinics} description={t.featuresDesc.clinics} link="/dashboard/patient/clinics" />
        <FeatureCard icon={Heart} title={t.features.symptomChecker} description={t.featuresDesc.symptomChecker} link="/dashboard/patient/chatbox" />
      </section>

      {/* WhatsApp Group QR Section */}
      <WhatsAppGroupSection />

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 mt-10">
        {t.footer.replace("{year}", new Date().getFullYear().toString())}
      </footer>
    </motion.div>
  );
}
