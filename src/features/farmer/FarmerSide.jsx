import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Plus, 
  Search, 
  Check, 
  X, 
  Sparkles, 
  MapPin, 
  Bell,
  TrendingUp
} from 'lucide-react';

export const FarmerSide = () => {
  const { 
    crops, 
    addCrop, 
    marketPrices, 
    aiDemandPredictions, 
    buyerRequests, 
    respondToBuyerRequest 
  } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State for Add Crop
  const [formData, setFormData] = useState({
    cropName: '',
    category: 'Fruits',
    quantityStock: '',
    askingPrice: '',
    location: 'Nashik, Maharashtra',
    quality: 'Grade A',
    farmerName: 'Ramesh Patil',
    farmerContact: '+91 98230 44123',
    harvestingDate: new Date().toISOString().split('T')[0]
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantityStock || !formData.askingPrice) return;
    addCrop(formData);
    setShowAddModal(false);
    setFormData({
      cropName: '',
      category: 'Fruits',
      quantityStock: '',
      askingPrice: '',
      location: 'Nashik, Maharashtra',
      quality: 'Grade A',
      farmerName: 'Ramesh Patil',
      farmerContact: '+91 98230 44123',
      harvestingDate: new Date().toISOString().split('T')[0]
    });
  };

  const filteredMarketPrices = marketPrices.filter((m) =>
    m.cropName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = buyerRequests.filter((r) => r.status === 'Pending');

  return (
    <div className="space-y-6 py-2">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
            <h1 className="text-xl font-bold text-slate-900">Farmer Workspace</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Add crops, track mandi prices, view AI demand predictions, and manage incoming buyer requests.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Crop Listing</span>
        </button>
      </div>

      {/* 1. Buyer Requests Notification Inbox */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-600" />
            <h2 className="font-bold text-sm text-slate-900">Incoming Buyer Requests</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
            {pendingRequests.length} Pending Notification{pendingRequests.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buyerRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">ID: {req.id}</span>
                  <h3 className="font-bold text-sm text-slate-900">{req.cropName}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Buyer: <strong>{req.buyerName}</strong> ({req.buyerContact})</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  req.status === 'Accepted'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : req.status === 'Rejected'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold'
                }`}>
                  {req.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Specified Target Price</span>
                  <span className="font-bold text-emerald-700">₹{req.requestedPrice}/kg</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Quantity Needed</span>
                  <span className="font-bold text-slate-900">{req.requestedQuantity} kg</span>
                </div>
              </div>

              {req.status === 'Pending' ? (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => respondToBuyerRequest(req.id, 'Accepted')}
                    className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    <span>Accept (Mark Status as SOLD)</span>
                  </button>
                  <button
                    onClick={() => respondToBuyerRequest(req.id, 'Rejected')}
                    className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-medium text-center py-1">
                  Request updated: <strong className={req.status === 'Accepted' ? 'text-emerald-700' : 'text-slate-700'}>{req.status}</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. AI Prediction Model for Demand */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <div>
            <h2 className="font-bold text-sm text-slate-900">AI Prediction Model for Demand</h2>
            <p className="text-xs text-slate-500">Actionable guidance helping farmers plan crop cultivation based on future market demand.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {aiDemandPredictions.map((ai, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>{ai.cropName}</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">{ai.predictedDemand}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                💡 {ai.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Search Features (Current Market Price & Best Time for Harvesting) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-sm text-slate-900">Current Market Price & Harvest Timing Search</h2>
            <p className="text-xs text-slate-500">Compare Mandi prices and best time for harvesting.</p>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search crop name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredMarketPrices.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="font-bold text-xs text-slate-900">{item.cropName}</h3>
              <p className="text-[11px] text-slate-500">{item.mandi}</p>
              <div className="flex justify-between items-center text-xs font-bold pt-1">
                <span className="text-emerald-700">₹{item.currentPrice}/kg</span>
                <span className="text-slate-600 font-medium text-[11px]">{item.trend}</span>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200 mt-1">
                🗓️ Best Harvest: <strong className="text-slate-800">{item.bestHarvestMonth}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. My Crop Listings (Best Day of Selling & Max Price Lifetime) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-bold text-sm text-slate-900">My Crop Listings & Selling Timeline</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crops.map((c) => (
            <div key={c.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {c.quality} • {c.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{c.cropName}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{c.location}</span>
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  c.status === 'SOLD'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Asking Price</span>
                  <span className="font-bold text-emerald-700">₹{c.askingPrice}/kg</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Stock Left</span>
                  <span className="font-bold text-slate-900">{c.quantityStock.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Min Acceptable</span>
                  <span className="font-bold text-amber-700">₹{c.minAcceptablePrice}/kg</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block font-medium">Max Lifetime Price</span>
                  <span className="font-bold text-purple-700">₹{c.maxLifetimePrice}/kg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Best Day of Selling</span>
                  <span className="text-slate-900 font-bold">{c.bestSellingDay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Spoilage Days Left</span>
                  <span className="text-slate-900 font-bold">{c.spoilageDaysRemaining} Days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
            <h3 className="font-bold text-base text-slate-900 mb-1">Add Crop Listing</h3>
            <p className="text-xs text-slate-500 mb-4">Enter details to list your crop for buyers.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alphonso Mangoes"
                  value={formData.cropName}
                  onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Available Stock (kg)</label>
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={formData.quantityStock}
                    onChange={(e) => setFormData({ ...formData, quantityStock: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Asking Price (₹/kg)</label>
                  <input
                    type="number"
                    required
                    placeholder="180"
                    value={formData.askingPrice}
                    onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quality Grade</label>
                  <select
                    value={formData.quality}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                  >
                    <option value="Grade A">Grade A (Export)</option>
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Grade C">Grade C (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  Publish Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
