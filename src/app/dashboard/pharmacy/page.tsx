"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Search,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  Pill,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function PharmacyDashboard() {
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/pharmacy/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMedicine = async () => {
    if (!medicineName || quantity <= 0 || price <= 0) {
      setError("All fields are required and must be valid");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/pharmacy/add-medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: medicineName,
          quantity,
          price,
          pharmacy: "MyPharmacy",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const newMed = await res.json();
      setMedicines((prev) => [...prev, newMed]);

      setMedicineName("");
      setQuantity(0);
      setPrice(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = medicines.filter(med => med.quantity <= 5).length;
  const totalRevenue = medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <Pill className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Pharmacy Dashboard</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Medicines</p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{medicines.length}</p>
            </div>
            <Package className="h-8 w-8 text-blue-700 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Total Revenue</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-700 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Pending Orders</p>
              <p className="text-3xl font-bold text-amber-700 dark:text-amber-400">23</p>
            </div>
            <Clock className="h-8 w-8 text-amber-700 dark:text-amber-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-400">{lowStockCount}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-700 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Medicine Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <Plus className="h-5 w-5 text-green-600" /> Add New Medicine
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddMedicine}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? "Adding..." : "Add Medicine"}
              </button>
              {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          </div>

          {/* Medicine Search */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <Search className="h-5 w-5 text-green-600" /> Medicine Inventory
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-3">
                {filteredMedicines.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    {searchTerm ? "No medicines found matching your search." : "No medicines added yet."}
                  </div>
                ) : (
                  filteredMedicines.map((med) => (
                    <div key={med._id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{med.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {med.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-green-600 dark:text-green-400">₹{med.price}</p>
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                            med.quantity <= 5 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }`}>
                            {med.quantity <= 5 ? "Low Stock" : "In Stock"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <ShoppingCart className="h-5 w-5 text-green-600" /> Recent Orders
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg">
                <div>
                  <p className="font-medium">Order #PH001234</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">John Doe • 2 items • ₹156.50</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Ready</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm">
                    <CheckCircle className="h-4 w-4 inline mr-1" /> Complete
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-lg">
                <div>
                  <p className="font-medium">Order #PH001235</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sarah Smith • 1 item • ₹45.00</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Preparing</span>
                  <button className="border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Clock className="h-4 w-4 inline mr-1" /> Processing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Medicine Name"]') as HTMLInputElement | null;
                  input?.focus();
                }}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                <Plus className="h-4 w-4 inline mr-2" /> Add New Medicine
              </button>
              <button className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <Search className="h-4 w-4 inline mr-2" /> Check Availability
              </button>
              <button className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <TrendingUp className="h-4 w-4 inline mr-2" /> Sales Report
              </button>
              <button className="w-full justify-start border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <AlertCircle className="h-4 w-4 inline mr-2" /> Low Stock Alert
              </button>
            </div>
          </div>

          {/* Nearby Pharmacies */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <MapPin className="h-5 w-5 text-green-600" /> Network Pharmacies
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="p-3 border rounded-lg dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">Apollo Pharmacy</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">4.8</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">2.5 km away</p>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 mt-1">Available</span>
              </div>
              <div className="p-3 border rounded-lg dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">MedPlus</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs">4.6</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">3.2 km away</p>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 mt-1">Available</span>
              </div>
            </div>
          </div>

          {/* Government Integration */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">PMJAY Integration</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Connected</p>
                <p className="text-xs text-green-700/80 dark:text-green-300/80">Real-time verification active</p>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
                Verify Patient Eligibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}