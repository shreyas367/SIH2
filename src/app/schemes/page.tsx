"use client";

import Link from "next/link";
import { HeartPulse, Shield, Hospital, Baby, Stethoscope, Syringe, Pill } from "lucide-react";

export default function SchemesPage() {
  const schemes = [
    {
      id: 1,
      title: "ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਯੋਜਨਾ (Ayushman Bharat)",
      description:
        "5 ਲੱਖ ਰੁਪਏ ਤੱਕ ਦਾ ਸਿਹਤ ਬੀਮਾ ਹਰ ਪਰਿਵਾਰ ਲਈ। ਕਈ ਵੱਡੀਆਂ ਸਰਜਰੀਆਂ ਅਤੇ ਇਲਾਜ ਮੁਫ਼ਤ।",
      link: "https://pmjay.gov.in/",
      icon: <HeartPulse className="w-12 h-12 text-green-600" />,
    },
    {
      id: 2,
      title: "ਸਰਬੱਤ ਸਿਹਤ ਬੀਮਾ ਯੋਜਨਾ (Punjab Sarbat Sehat Bima Yojana)",
      description:
        "ਪੰਜਾਬ ਦੇ ਲੋਕਾਂ ਲਈ ਮੁਫ਼ਤ ਸਿਹਤ ਬੀਮਾ। 650 ਤੋਂ ਵੱਧ ਇਲਾਜ ਸਰਕਾਰੀ ਅਤੇ ਪ੍ਰਾਈਵੇਟ ਹਸਪਤਾਲਾਂ ਵਿੱਚ।",
      link: "https://sha.punjab.gov.in/",
      icon: <Shield className="w-12 h-12 text-blue-600" />,
    },
    {
      id: 3,
      title: "ਰਾਸ਼ਟਰੀ ਸਿਹਤ ਮਿਸ਼ਨ (National Health Mission)",
      description:
        "ਪਿੰਡਾਂ ਵਿੱਚ ਮਾਤਾ-ਬੱਚਾ ਸਿਹਤ, ਟੀਕਾਕਰਣ ਅਤੇ ਜ਼ਰੂਰੀ ਸਿਹਤ ਸੇਵਾਵਾਂ।",
      link: "https://nhm.gov.in/",
      icon: <Hospital className="w-12 h-12 text-red-600" />,
    },
    {
      id: 4,
      title: "ਜਨਨੀ ਸੁਰੱਖਸ਼ਾ ਯੋਜਨਾ (Janani Suraksha Yojana)",
      description:
        "ਗਰਭਵਤੀ ਮਹਿਲਾਵਾਂ ਲਈ ਸੁਰੱਖਿਅਤ ਜਨਮ ਅਤੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲਾਂ ਵਿੱਚ ਮੁਫ਼ਤ ਸੇਵਾਵਾਂ।",
      link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
      icon: <Baby className="w-12 h-12 text-pink-500" />,
    },
    {
      id: 5,
      title: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮਾਤ੍ਰੁ ਵੰਦਨਾ ਯੋਜਨਾ (PMMVY)",
      description:
        "ਗਰਭਵਤੀ ਅਤੇ ਦੁੱਧ ਪਿਲਾਉਣ ਵਾਲੀਆਂ ਮਹਿਲਾਵਾਂ ਲਈ ਪੋਸ਼ਣ ਖ਼ਰਚ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ।",
      link: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
      icon: <Stethoscope className="w-12 h-12 text-yellow-600" />,
    },
    {
      id: 6,
      title: "ਰਾਸ਼ਟਰੀ ਬਾਲ ਸਿਹਤ ਪ੍ਰੋਗਰਾਮ (RBSK)",
      description:
        "0 ਤੋਂ 18 ਸਾਲ ਦੇ ਬੱਚਿਆਂ ਲਈ ਮੁਫ਼ਤ ਸਿਹਤ ਜਾਂਚ, ਇਲਾਜ ਅਤੇ ਰਿਫਰਲ ਸੇਵਾਵਾਂ।",
      link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1041&lid=609",
      icon: <Syringe className="w-12 h-12 text-purple-600" />,
    },
    {
      id: 7,
      title: "ਨਿਕਸ਼ਯ ਪੋਸ਼ਣ ਯੋਜਨਾ (Nikshay Poshan Yojana)",
      description:
        "ਟੀਬੀ ਮਰੀਜ਼ਾਂ ਨੂੰ ਇਲਾਜ ਦੌਰਾਨ ਹਰ ਮਹੀਨੇ ₹500 ਪੋਸ਼ਣ ਸਹਾਇਤਾ।",
      link: "https://www.nhp.gov.in/Nikshay-Poshan-Yojana_pg",
      icon: <Pill className="w-12 h-12 text-indigo-600" />,
    },
    {
      id: 8,
      title: "ਪੰਜਾਬ ਮੁਫ਼ਤ ਦਵਾਈਆਂ ਅਤੇ ਟੈਸਟ ਯੋਜਨਾ",
      description:
        "ਪੰਜਾਬ ਦੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲਾਂ ਵਿੱਚ ਮੁਫ਼ਤ ਦਵਾਈਆਂ ਅਤੇ ਡਾਇਗਨੋਸਟਿਕ ਟੈਸਟ।",
      link: "https://punjab.gov.in/",
      icon: <Hospital className="w-12 h-12 text-teal-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="pt-28 pb-12 text-center bg-gradient-to-r from-green-700 via-green-600 to-blue-600 dark:from-green-900 dark:to-blue-900 text-white">
        <h1 className="text-4xl font-extrabold mb-3 drop-shadow-lg">
          ਸਰਕਾਰੀ ਸਿਹਤ ਯੋਜਨਾਵਾਂ (Gov Healthcare Schemes)
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Nabha ਅਤੇ ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਲੋਕਾਂ ਲਈ ਉਪਲਬਧ ਮੁੱਖ ਸਿਹਤ ਯੋਜਨਾਵਾਂ।
        </p>
      </header>

      {/* Schemes Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center transform hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center mb-6">{scheme.icon}</div>
            <h3 className="text-xl font-bold mb-3">{scheme.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {scheme.description}
            </p>
            <Link
              href={scheme.link}
              target="_blank"
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md"
            >
              ਹੋਰ ਜਾਣੋ (Learn More)
            </Link>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 mt-10 border-t dark:border-gray-700">
        © {new Date().getFullYear()} ਨਭਾ ਹੈਲਥਕੇਅਰ | Rural Punjab Healthcare
      </footer>
    </div>
  );
}
