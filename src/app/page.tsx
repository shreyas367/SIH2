// src/app/page.tsx
"use client";
import { Pill, Menu, Sun, Moon } from "lucide-react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

function PharmacyCard() {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center">
      <div className="flex justify-center mb-3">
        <Pill className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-bold mb-2">
        ਦਵਾਈ ਜਾਣਕਾਰੀ (Pharmacy Updates)
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        ਨਜ਼ਦੀਕੀ ਫਾਰਮੇਸੀ ਵਿੱਚ ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ ਵੇਖੋ। (Check availability of medicines in nearby pharmacy)
      </p>
      <button
        onClick={() => router.push("/dashboard/patient/pharmacy")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
      >
        ਚੈਕ ਕਰੋ (Check)
      </button>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-green-700 dark:text-green-400"
          >
            ਨਭਾ ਹੈਲਥਕੇਅਰ (Nabha Healthcare)
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">
              ਮੁੱਖ ਸਫ਼ਾ (Home)
            </Link>
            <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400">
              ਬਾਰੇ (About)
            </Link>
            <Link href="/contact" className="hover:text-green-600 dark:hover:text-green-400">
              ਸੰਪਰਕ (Contact)
            </Link>
            <Link href="/schemes" className="hover:text-green-600 dark:hover:text-green-400">
              ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ (Schemes)
            </Link>
            <Link href="/auth/login" className="hover:text-green-600 dark:hover:text-green-400">
              ਲੌਗਇਨ (Login)
            </Link>
            <Link href="/auth/signup" className="hover:text-green-600 dark:hover:text-green-400">
              ਰਜਿਸਟਰ (Sign Up)
            </Link>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 px-6 pb-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              ਮੁੱਖ ਸਫ਼ਾ (Home)
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              ਬਾਰੇ (About)
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              ਸੰਪਰਕ (Contact)
            </Link>
            <Link href="/schemes" onClick={() => setMenuOpen(false)}>
              ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ (Schemes)
            </Link>
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
              ਲੌਗਇਨ (Login)
            </Link>
            <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>
              ਰਜਿਸਟਰ (Sign Up)
            </Link>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 text-center bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-900 dark:to-blue-900 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ਸਿਹਤ ਸਭ ਲਈ (Healthcare for Everyone in Nabha)
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Nabha ਦੇ ਪਿੰਡਾਂ ਲਈ ਆਨਲਾਈਨ ਸਿਹਤ ਸੇਵਾਵਾਂ (Online healthcare services for villages of Nabha) —  
          Doctor Consultations, Prescriptions, ਅਤੇ 24/7 Support ਤੁਹਾਡੇ ਲਈ (Doctor consultations, prescriptions, and 24/7 support for you).
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100"
          >
            ਸ਼ੁਰੂ ਕਰੋ (Get Started)
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-green-700 hover:text-white"
          >
            ਲੌਗਇਨ (Login)
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">ਡਾਕਟਰ ਅਪਾਇੰਟਮੈਂਟ (Doctor Appointments)</h3>
          <p className="text-gray-600 dark:text-gray-300">
            ਆਪਣੇ ਪਿੰਡ ਤੋਂ ਹੀ Doctor ਨਾਲ Online ਬੈਠਕ ਕਰੋ। (Consult with a doctor online from your village)
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">ਦਵਾਈਆਂ & ਪ੍ਰਿਸਕ੍ਰਿਪਸ਼ਨ (Medicines & Prescriptions)</h3>
          <p className="text-gray-600 dark:text-gray-300">
            ਦਵਾਈਆਂ ਅਤੇ ਰਿਕਾਰਡ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸੰਭਾਲੋ। (Securely manage medicines and records)
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">24/7 ਸੇਵਾ (24/7 Services)</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Nabha ਦੇ ਕਿਸੇ ਵੀ ਪਿੰਡ ਤੋਂ ਹਮੇਸ਼ਾਂ ਉਪਲਬਧ। (Available anytime from any village in Nabha)
          </p>
        </div>
        {/* ✅ Pharmacy Card */}
        <PharmacyCard />
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 mt-10">
        © {new Date().getFullYear()} ਨਭਾ ਹੈਲਥਕੇਅਰ (Nabha Healthcare) | Rural Punjab Healthcare
      </footer>
    </div>
  );
}