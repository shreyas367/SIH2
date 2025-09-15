"use client";

import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          🩺 AI Symptom Checker
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Describe your symptoms and get instant AI-powered health insights.
        </p>
        <div className="border-t pt-6">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
