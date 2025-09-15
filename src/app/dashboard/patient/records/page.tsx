"use client";
import { useEffect, useState } from "react";

interface Prescription {
  _id: string;
  title: string;
  notes: string;
  fileUrl?: string;
  createdAt: string;
}

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("/api/prescriptions", { cache: "no-store" });
        if (!res.ok) {
          if (res.status === 401) setError("Unauthorized. Please login.");
          else setError("Failed to fetch prescriptions.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setPrescriptions(data);
      } catch (err) {
        console.error(err);
        setError("Server error while fetching prescriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p className="p-6">Loading prescriptions...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Prescriptions</h1>

      {prescriptions.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No prescriptions available.</p>
      )}

      <div className="grid gap-4">
        {prescriptions.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >

            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{p.notes}</p>
            
            {p.fileUrl && (
              <a
                href={p.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 mt-2 inline-block"
              >
                View Prescription File
              </a>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Created at: {new Date(p.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
