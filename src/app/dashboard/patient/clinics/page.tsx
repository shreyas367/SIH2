"use client";

export default function ClinicsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="pt-28 pb-8 text-center bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-900 dark:to-blue-900 text-white">
        <h1 className="text-3xl font-bold mb-2">ਨੇੜਲੇ ਹਸਪਤਾਲ (Nearby Clinics)</h1>
        <p className="max-w-2xl mx-auto text-lg">
          ਨਭਾ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਅਤੇ ਪੀਐਚਸੀ ਵੇਖੋ।
        </p>
      </header>

      {/* Map Embed */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?q=hospitals+near+Nabha+Punjab&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            title="Nearby Clinics Map"
          ></iframe>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Nabha Healthcare | Rural Punjab
      </footer>
    </div>
  );
}
