import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { StarRating, StarPicker } from '../../components/ChartComponents';
import {
  Search,
  SlidersHorizontal,
  Send,
  MapPin,
  User,
  ArrowUpDown,
  X,
  Package,
  Inbox,
  PhoneCall,
  MessageSquare,
  Truck,
  Star
} from 'lucide-react';

export const BuyerSide = () => {
  const {
    crops, sendBuyerRequest, buyerRequests, cancelBuyerRequest, respondToCounterOffer,
    getFarmerRating, rateFarmer, requestTransport, currentUser
  } = useStore();

  // Search & Filter State
  const [searchCropQuery, setSearchCropQuery] = useState('');
  const [searchFarmerQuery, setSearchFarmerQuery] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState('default');
  const [selectedTab, setSelectedTab] = useState('crops'); // 'crops' | 'farmers' | 'myRequests'

  // Send Buyer Request Modal State
  const [requestCrop, setRequestCrop] = useState(null);
  const [buyerName, setBuyerName] = useState(currentUser?.name || '');
  const [buyerContact, setBuyerContact] = useState(currentUser?.contact || '');
  const [reqPrice, setReqPrice] = useState('');
  const [reqQty, setReqQty] = useState('');

  // Transport Modal State
  const [transportCrop, setTransportCrop] = useState(null);
  const [pickupLoc, setPickupLoc] = useState('');
  const [deliveryLoc, setDeliveryLoc] = useState('');
  const [neededDate, setNeededDate] = useState('');

  // Rating Modal State
  const [ratingFarmerName, setRatingFarmerName] = useState(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  // Filter & Sort crops
  const filteredCrops = useMemo(() => {
    let list = crops.filter((c) => {
      const matchesCrop = c.cropName.toLowerCase().includes(searchCropQuery.toLowerCase());
      const matchesFarmer = c.farmerName.toLowerCase().includes(searchFarmerQuery.toLowerCase()) || c.location.toLowerCase().includes(searchFarmerQuery.toLowerCase());
      const matchesQuality = selectedQuality === 'All' || c.quality === selectedQuality;
      const matchesPrice = c.askingPrice <= maxPrice;
      return matchesCrop && matchesFarmer && matchesQuality && matchesPrice;
    });

    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.askingPrice - b.askingPrice);
    else if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.askingPrice - a.askingPrice);
    else if (sortBy === 'stock_desc') list = [...list].sort((a, b) => b.quantityStock - a.quantityStock);
    else if (sortBy === 'freshest') list = [...list].sort((a, b) => new Date(b.harvestingDate) - new Date(a.harvestingDate));

    return list;
  }, [crops, searchCropQuery, searchFarmerQuery, selectedQuality, maxPrice, sortBy]);

  const handleSendRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestCrop || !reqPrice || !reqQty || !buyerName) return;
    sendBuyerRequest(requestCrop, buyerName, buyerContact, reqPrice, reqQty);
    setRequestCrop(null);
    setReqPrice('');
    setReqQty('');
  };

  const pendingCount = buyerRequests.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-6 py-2">
      {/* Header Bar */}
      <div className="glass-card p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Buyer Dashboard</h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Search crops & farmers, check spoilage threshold prices, and send purchase requests directly.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setSelectedTab('crops')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 active:scale-95 ${
              selectedTab === 'crops' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Crop Catalog
          </button>
          <button
            onClick={() => setSelectedTab('farmers')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 active:scale-95 ${
              selectedTab === 'farmers' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Farmer Directory
          </button>
          <button
            onClick={() => setSelectedTab('myRequests')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 active:scale-95 relative ${
              selectedTab === 'myRequests' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Sent Requests
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Multi-Parametric Filters */}
      <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <SlidersHorizontal className="h-5 w-5 text-blue-600" />
          <h2 className="font-bold text-base text-slate-900">Search & Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Search Crop Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Mangoes, Onions, Rice..."
                value={searchCropQuery}
                onChange={(e) => setSearchCropQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
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
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Quality Grade</label>
            <select
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
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

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Sort By</label>
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="stock_desc">Most Stock Available</option>
                <option value="freshest">Freshest Harvest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tab View 1: Crop Catalog */}
      {selectedTab === 'crops' && (
        filteredCrops.length === 0 ? (
          <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in-up stagger-3">
            <Package className="h-16 w-16 text-slate-300" />
            <p className="font-bold text-slate-400 text-lg">No crops match your filters</p>
            <p className="text-sm text-slate-400">Try adjusting the search query, price range, or quality grade.</p>
            <button
              onClick={() => { setSearchCropQuery(''); setSearchFarmerQuery(''); setSelectedQuality('All'); setMaxPrice(300); setSortBy('default'); }}
              className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up stagger-3">
            {filteredCrops.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              >
                {c.image && (
                  <div className="h-40 w-full shrink-0 border-b border-slate-100">
                    <img src={c.image} alt={c.cropName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
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

                  <h3 className="font-bold text-lg text-slate-900">{c.cropName}</h3>

                  {/* Farmer Details & Rating */}
                  <div className="space-y-1 mt-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        <span>Farmer: <strong>{c.farmerName}</strong></span>
                      </p>
                      {(() => {
                        const r = getFarmerRating(c.farmerName);
                        return <StarRating rating={r.avg} count={r.count} />;
                      })()}
                    </div>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{c.location}</span>
                    </p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <a href={`tel:${c.farmerContact}`} className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors group">
                        <PhoneCall className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                        <span className="group-hover:underline">{c.farmerContact}</span>
                      </a>
                      <a href={`https://wa.me/${c.farmerContact?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${c.farmerName}, I'm interested in your ${c.cropName} listed on FarmerMarket.`)}`}
                        target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
                        <MessageSquare className="h-3.5 w-3.5 fill-emerald-100" />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>

                  {/* Spoilage Pricing Threshold */}
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

                  {/* Transport Availability Indicator */}
                  {c.transport?.available && (
                    <div className="mb-3 p-2 rounded-lg bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs text-blue-800">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span>Transport Facility Available ({c.transport.vehicle})</span>
                      </div>
                      <button onClick={() => {
                        setTransportCrop(c);
                        setPickupLoc(c.location);
                      }} className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] transition-colors">
                        Book Transport
                      </button>
                    </div>
                  )}
                </div>

                {/* Send Request Button */}
                <div className="p-4 pt-0">
                  {c.status !== 'SOLD' ? (
                    <button
                      onClick={() => {
                        setRequestCrop(c);
                        setReqPrice(c.askingPrice);
                        setReqQty(Math.min(500, c.quantityStock));
                      }}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Buyer Request</span>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-400 font-bold text-sm text-center">
                      Listing Status: SOLD
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Tab View 2: Farmer Directory */}
      {selectedTab === 'farmers' && (
        <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in-up stagger-3">
          <h2 className="font-bold text-base text-slate-900">Farmer Directory</h2>
          {filteredCrops.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <User className="h-12 w-12 text-slate-300" />
              <p className="font-bold text-slate-400 text-sm">No farmers match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredCrops.map((c) => (
                <div key={c.id} className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1.5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{c.farmerName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{c.location}</span>
                      </p>
                    </div>
                    <a
                      href={`tel:${c.farmerContact}`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <PhoneCall className="h-3 w-3" />
                      {c.farmerContact}
                    </a>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex justify-between">
                    <span>Crop: <strong>{c.cropName}</strong></span>
                    <span>Stock: <strong>{c.quantityStock.toLocaleString()} kg</strong> @ ₹{c.askingPrice}/kg</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab View 3: Sent Requests */}
      {selectedTab === 'myRequests' && (
        <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in-up stagger-3">
          <h2 className="font-bold text-base text-slate-900">Sent Requests History</h2>
          {buyerRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
              <Inbox className="h-12 w-12 text-slate-300" />
              <p className="font-bold text-slate-400 text-sm">No requests sent yet</p>
              <p className="text-xs text-slate-400">Browse the Crop Catalog and send a request to a farmer.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {buyerRequests.map((r) => (
                <div key={r.id} className="p-3.5 rounded-lg bg-white border border-slate-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">{r.id} • {r.date}</p>
                      <h3 className="font-bold text-slate-900 text-sm">{r.cropName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Farmer: <strong>{r.farmerName}</strong> | Qty: {r.requestedQuantity} kg @ ₹{r.requestedPrice}/kg</p>
                      {r.counterPrice && (
                        <p className="text-xs text-purple-700 font-bold mt-1">🔄 Farmer Counter Offer: ₹{r.counterPrice}/kg</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        r.status === 'Accepted' ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : r.status === 'Rejected' ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : r.status === 'Counter Offered' ? 'bg-purple-50 text-purple-800 border-purple-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold'
                      }`}>{r.status}</span>
                      {r.status === 'Pending' && (
                        <button onClick={() => cancelBuyerRequest(r.id)} title="Cancel request"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Rate Farmer button if Accepted */}
                  {r.status === 'Accepted' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        ✓ Deal Closed
                      </span>
                      <button onClick={() => setRatingFarmerName(r.farmerName)}
                        className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-300 flex items-center gap-1 transition-all">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                        <span>Rate Farmer</span>
                      </button>
                    </div>
                  )}

                  {/* Counter Offer Response Buttons */}
                  {r.status === 'Counter Offered' && (
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => respondToCounterOffer(r.id, true)}
                        className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95">
                        ✓ Accept ₹{r.counterPrice}/kg
                      </button>
                      <button onClick={() => respondToCounterOffer(r.id, false)}
                        className="flex-1 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all hover:scale-105 active:scale-95">
                        ✕ Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Send Buyer Request Modal */}
      {requestCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Send Purchase Request</h3>
                <p className="text-xs text-slate-500">To farmer: <strong>{requestCrop.farmerName}</strong></p>
              </div>
              <button onClick={() => setRequestCrop(null)} className="text-slate-400 hover:text-slate-600 font-bold transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequestSubmit} className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block text-sm">{requestCrop.cropName}</span>
                <span className="text-slate-600">Asking Price: ₹{requestCrop.askingPrice}/kg • Stock: {requestCrop.quantityStock.toLocaleString()} kg</span>
              </div>

              {/* Buyer Identity */}
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 space-y-3">
                <p className="text-xs font-bold text-blue-800">Your Identity</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="FreshAgro Retail"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Contact</label>
                    <input
                      type="text"
                      placeholder="+91 91122 33445"
                      value={buyerContact}
                      onChange={(e) => setBuyerContact(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Specified Target Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={reqPrice}
                  onChange={(e) => setReqPrice(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Needed (kg) — max {requestCrop.quantityStock.toLocaleString()} kg</label>
                <input
                  type="number"
                  required
                  max={requestCrop.quantityStock}
                  value={reqQty}
                  onChange={(e) => setReqQty(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setRequestCrop(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Transport Modal */}
      {transportCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">Request Transport Facility</h3>
              </div>
              <button onClick={() => setTransportCrop(null)} className="text-slate-400 hover:text-slate-600 font-bold transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 space-y-1">
              <p className="font-extrabold text-blue-900">{transportCrop.cropName} — {transportCrop.farmerName}</p>
              <p>🚚 Vehicle Type: <strong>{transportCrop.transport?.vehicle}</strong> (@ ₹{transportCrop.transport?.costPerKm}/km)</p>
              <p>📍 Farmer Location: {transportCrop.location}</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              requestTransport(transportCrop, buyerName || 'Buyer', buyerContact || '', pickupLoc, deliveryLoc, neededDate);
              setTransportCrop(null);
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Location *</label>
                <input type="text" required value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Destination *</label>
                <input type="text" required placeholder="Enter delivery warehouse address..." value={deliveryLoc} onChange={(e) => setDeliveryLoc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date Needed *</label>
                <input type="date" required value={neededDate} onChange={(e) => setNeededDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setTransportCrop(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit"
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all hover:scale-105 active:scale-95">
                  <Truck className="h-4 w-4" /> Submit Transport Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rate Farmer Modal */}
      {ratingFarmerName && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-xl space-y-4 text-center">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Rate Farmer: {ratingFarmerName}</h3>
              <button onClick={() => setRatingFarmerName(null)} className="text-slate-400 hover:text-slate-600 font-bold transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center py-2">
              <StarPicker value={ratingStars} onChange={(s) => setRatingStars(s)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 text-left">Feedback / Comment (Optional)</label>
              <textarea rows="3" placeholder="Great crop quality, fast delivery..." value={ratingComment} onChange={(e) => setRatingComment(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none" />
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setRatingFarmerName(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="button" onClick={() => {
                rateFarmer(ratingFarmerName, ratingStars, ratingComment, currentUser?.name || 'Buyer');
                setRatingFarmerName(null);
                setRatingComment('');
              }}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow transition-all hover:scale-105 active:scale-95">
                Submit Rating ★
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
