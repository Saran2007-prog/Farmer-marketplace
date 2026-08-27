import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  Search, 
  SlidersHorizontal, 
  Send, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Clock, 
  Tag
} from 'lucide-react';

export const BuyerSide = () => {
  const { crops, sendBuyerRequest, buyerRequests } = useStore();

  // Search & Filter State
  const [searchCropQuery, setSearchCropQuery] = useState('');
  const [searchFarmerQuery, setSearchFarmerQuery] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250);
  const [selectedTab, setSelectedTab] = useState('crops'); // 'crops' | 'farmers' | 'myRequests'

  // Send Buyer Request Modal State
  const [requestCrop, setRequestCrop] = useState(null);
  const [buyerName, setBuyerName] = useState('FreshAgro Retail');
  const [buyerContact, setBuyerContact] = useState('+91 91122 33445');
  const [reqPrice, setReqPrice] = useState('');
  const [reqQty, setReqQty] = useState('');

  // Filter crops based on Crop, Price, Location, Availability, Quality, Quantity
  const filteredCrops = crops.filter((c) => {
    const matchesCrop = c.cropName.toLowerCase().includes(searchCropQuery.toLowerCase());
    const matchesFarmer = c.farmerName.toLowerCase().includes(searchFarmerQuery.toLowerCase()) || c.location.toLowerCase().includes(searchFarmerQuery.toLowerCase());
    const matchesQuality = selectedQuality === 'All' || c.quality === selectedQuality;
    const matchesPrice = c.askingPrice <= maxPrice;
    return matchesCrop && matchesFarmer && matchesQuality && matchesPrice;
  });

  const handleSendRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestCrop || !reqPrice || !reqQty) return;
    sendBuyerRequest(requestCrop, buyerName, buyerContact, reqPrice, reqQty);
    setRequestCrop(null);
    setReqPrice('');
    setReqQty('');
  };

  return (
    <div className="space-y-6 py-2">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <h1 className="text-xl font-bold text-slate-900">Buyer Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Search crops & farmers, check spoilage threshold prices, and send purchase requests directly.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setSelectedTab('crops')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedTab === 'crops' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Crop Catalog
          </button>
          <button
            onClick={() => setSelectedTab('farmers')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedTab === 'farmers' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Farmer Directory
          </button>
          <button
            onClick={() => setSelectedTab('myRequests')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedTab === 'myRequests' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sent Requests
          </button>
        </div>
      </div>

      {/* Search & Multi-Parametric Filters */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          <h2 className="font-bold text-sm text-slate-900">Search & Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Search Crop Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Mangoes, Onions, Rice..."
                value={searchCropQuery}
                onChange={(e) => setSearchCropQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Search Farmer / Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Ramesh, Nashik, Karnal..."
                value={searchFarmerQuery}
                onChange={(e) => setSearchFarmerQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Quality Grade</label>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
            >
              <option value="All">All Quality Grades</option>
              <option value="Grade A">Grade A (Export / Premium)</option>
              <option value="Grade B">Grade B (Standard)</option>
              <option value="Grade C">Grade C (Processing)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Max Asking Price</span>
              <span className="text-blue-700 font-bold">₹{maxPrice}/kg</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Tab View 1: Crop Catalog */}
      {selectedTab === 'crops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrops.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {c.quality}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    c.status === 'SOLD' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{c.cropName}</h3>
                
                {/* Farmer Details */}
                <div className="space-y-1 mt-2 text-xs text-slate-600">
                  <p className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Farmer: <strong>{c.farmerName}</strong></span>
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{c.location}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{c.farmerContact}</span>
                  </p>
                </div>

                {/* Spoilage Pricing Threshold (Purple Note Specs) */}
                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Asking Price</span>
                    <span className="font-bold text-blue-700 text-sm">₹{c.askingPrice}/kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Stock Left</span>
                    <span className="font-bold text-slate-900 text-sm">{c.quantityStock.toLocaleString()} kg</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200 flex justify-between text-[10px] text-slate-600 font-medium">
                    <span>Spoilage Threshold Price:</span>
                    <strong className="text-amber-700 font-bold">₹{c.minAcceptablePrice}/kg</strong>
                  </div>
                </div>
              </div>

              {/* Send Request Button */}
              {c.status !== 'SOLD' ? (
                <button
                  onClick={() => {
                    setRequestCrop(c);
                    setReqPrice(c.askingPrice);
                    setReqQty(Math.min(500, c.quantityStock));
                  }}
                  className="w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Buyer Request to Farmer</span>
                </button>
              ) : (
                <div className="w-full py-2 rounded-lg bg-slate-100 text-slate-400 font-bold text-xs text-center">
                  Listing Status: SOLD
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab View 2: Farmer Directory */}
      {selectedTab === 'farmers' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Farmer Directory (Farmer Listing Details)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCrops.map((c) => (
              <div key={c.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{c.farmerName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <span>{c.location}</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Contact: {c.farmerContact}
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 text-xs font-medium text-slate-700 flex justify-between">
                  <span>Crop: <strong>{c.cropName}</strong></span>
                  <span>Stock: <strong>{c.quantityStock.toLocaleString()} kg</strong> @ ₹{c.askingPrice}/kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab View 3: Sent Requests */}
      {selectedTab === 'myRequests' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Sent Requests History</h2>
          <div className="space-y-2">
            {buyerRequests.map((r) => (
              <div key={r.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <h3 className="font-bold text-slate-900">{r.cropName} (Farmer: {r.farmerName})</h3>
                  <p className="text-slate-500 mt-0.5">Requested Qty: {r.requestedQuantity} kg @ ₹{r.requestedPrice}/kg</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  r.status === 'Accepted'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : r.status === 'Rejected'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Send Buyer Request Modal */}
      {requestCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Send Request to Specific Farmer</h3>
                <p className="text-xs text-slate-500">Farmer: {requestCrop.farmerName}</p>
              </div>
              <button onClick={() => setRequestCrop(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSendRequestSubmit} className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block">{requestCrop.cropName}</span>
                <span className="text-slate-600 text-[11px]">Asking Price: ₹{requestCrop.askingPrice}/kg • Stock: {requestCrop.quantityStock} kg</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Specified Target Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={reqPrice}
                  onChange={(e) => setReqPrice(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stock / Quantity Needed (kg)</label>
                <input
                  type="number"
                  required
                  max={requestCrop.quantityStock}
                  value={reqQty}
                  onChange={(e) => setReqQty(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setRequestCrop(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
