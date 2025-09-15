export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white pt-32 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">About MedApp</h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 text-center">
        MedApp is designed to simplify healthcare. Our mission is to provide patients
        with easy access to doctors, secure management of prescriptions, and 
        seamless healthcare services anytime, anywhere.
      </p>

      <div className="max-w-5xl mx-auto mt-12 grid gap-8 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            To connect patients and healthcare providers with modern, digital tools 
            that save time and improve care quality.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">Why MedApp?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We aim to be your trusted companion in managing health, ensuring privacy, 
            convenience, and reliability at every step.
          </p>
        </div>
      </div>
    </div>
  );
}
