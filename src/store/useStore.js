import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Active Navigation Tab: 'landing' | 'farmer' | 'buyer'
  activeRole: 'landing',
  setActiveRole: (role) => set({ activeRole: role }),

  // Current User (Login State)
  currentUser: null, // { name, contact, role: 'farmer' | 'buyer' }
  isLoggedIn: false,
  login: (name, contact, role) => {
    set({ currentUser: { name, contact, role }, isLoggedIn: true });
    // Auto-navigate to the correct dashboard
    set({ activeRole: role });
  },
  logout: () => set({ currentUser: null, isLoggedIn: false, activeRole: 'landing' }),

  // Notification Toasts
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  // 1. Farmer Crop Listings (Farmer Side + Farmer Listing)
  crops: [
    {
      id: 'CROP-101',
      farmerName: 'Ramesh Patil',
      farmerContact: '+91 98230 44123',
      cropName: 'Alphonso Mangoes',
      category: 'Fruits',
      quantityStock: 2500,
      askingPrice: 180,
      minAcceptablePrice: 150,
      maxLifetimePrice: 210,
      location: 'Ratnagiri, Maharashtra',
      quality: 'Grade A',
      harvestingDate: '2026-08-20',
      bestHarvestTime: 'Completed (Optimal)',
      bestSellingDay: 'Within next 5 days',
      spoilageDaysRemaining: 4,
      status: 'Active',
      image: '/crop_mangoes.jpg',
      transport: { available: true, vehicle: 'Tempo', costPerKm: 12, maxDistance: 200 }
    },
    {
      id: 'CROP-102',
      farmerName: 'Suresh Deshmukh',
      farmerContact: '+91 94221 88712',
      cropName: 'Red Onions',
      category: 'Vegetables',
      quantityStock: 10000,
      askingPrice: 32,
      minAcceptablePrice: 26,
      maxLifetimePrice: 38,
      location: 'Nashik, Maharashtra',
      quality: 'Grade A',
      harvestingDate: '2026-08-22',
      bestHarvestTime: 'Optimal (Harvested)',
      bestSellingDay: 'Next 12 days',
      spoilageDaysRemaining: 40,
      status: 'Active',
      image: '/crop_onions.jpg',
      transport: { available: false }
    },
    {
      id: 'CROP-103',
      farmerName: 'Gurpreet Singh',
      farmerContact: '+91 98120 55432',
      cropName: 'Basmati Rice 1121',
      category: 'Grains',
      quantityStock: 15000,
      askingPrice: 95,
      minAcceptablePrice: 85,
      maxLifetimePrice: 105,
      location: 'Karnal, Haryana',
      quality: 'Grade A',
      harvestingDate: '2026-08-15',
      bestHarvestTime: 'Harvest Completed',
      bestSellingDay: 'Anytime within 3 months',
      spoilageDaysRemaining: 150,
      status: 'Active',
      image: '/crop_rice.jpg',
      transport: { available: true, vehicle: 'Truck', costPerKm: 18, maxDistance: 500 }
    },
    {
      id: 'CROP-104',
      farmerName: 'Venkatesh Gowda',
      farmerContact: '+91 99001 22345',
      cropName: 'Hybrid Tomatoes',
      category: 'Vegetables',
      quantityStock: 1800,
      askingPrice: 24,
      minAcceptablePrice: 18,
      maxLifetimePrice: 30,
      location: 'Kolar, Karnataka',
      quality: 'Grade B',
      harvestingDate: '2026-08-25',
      bestHarvestTime: 'Immediate Harvest Required',
      bestSellingDay: 'Next 3 days',
      spoilageDaysRemaining: 3,
      status: 'Active',
      image: '/crop_tomatoes.jpg',
      transport: { available: true, vehicle: 'Mini Truck', costPerKm: 10, maxDistance: 150 }
    }
  ],

  // Add Crop Listing
  addCrop: (newCrop) => {
    const item = {
      id: `CROP-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      minAcceptablePrice: Math.round(Number(newCrop.askingPrice) * 0.8),
      maxLifetimePrice: Math.round(Number(newCrop.askingPrice) * 1.15),
      bestHarvestTime: 'Ready for Harvesting',
      bestSellingDay: 'Next 7 days',
      spoilageDaysRemaining: 14,
      ...newCrop,
      quantityStock: Number(newCrop.quantityStock),
      askingPrice: Number(newCrop.askingPrice),
      image: newCrop.image || '/crop_mangoes.jpg'
    };
    set((state) => ({ crops: [item, ...state.crops] }));
    get().addToast(`Crop listing for "${item.cropName}" published successfully!`, 'success');
  },

  // Edit Crop Listing
  editCrop: (cropId, updatedData) => {
    set((state) => ({
      crops: state.crops.map((c) =>
        c.id === cropId
          ? { ...c, ...updatedData, askingPrice: Number(updatedData.askingPrice), quantityStock: Number(updatedData.quantityStock), minAcceptablePrice: Math.round(Number(updatedData.askingPrice) * 0.8), maxLifetimePrice: Math.round(Number(updatedData.askingPrice) * 1.15) }
          : c
      ),
    }));
    get().addToast('Crop listing updated successfully!', 'success');
  },

  // Delete Crop Listing
  deleteCrop: (cropId) => {
    const crop = get().crops.find((c) => c.id === cropId);
    if (!crop) return;
    set((state) => ({ crops: state.crops.filter((c) => c.id !== cropId) }));
    get().addToast(`Listing for "${crop.cropName}" deleted.`, 'info');
  },

  // Cancel a Buyer Request (only if Pending)
  cancelBuyerRequest: (requestId) => {
    const request = get().buyerRequests.find((r) => r.id === requestId);
    if (!request || request.status !== 'Pending') return;
    set((state) => ({ buyerRequests: state.buyerRequests.filter((r) => r.id !== requestId) }));
    get().addToast(`Request for "${request.cropName}" has been cancelled.`, 'info');
  },

  // Farmer sends a Counter Offer to buyer
  counterOfferRequest: (requestId, counterPrice) => {
    const request = get().buyerRequests.find((r) => r.id === requestId);
    if (!request) return;
    set((state) => ({
      buyerRequests: state.buyerRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'Counter Offered', counterPrice: Number(counterPrice) } : r
      ),
    }));
    get().addToast(`Counter offer of ₹${counterPrice}/kg sent to ${request.buyerName}.`, 'success');
  },

  // Buyer responds to a counter offer
  respondToCounterOffer: (requestId, accepted) => {
    const request = get().buyerRequests.find((r) => r.id === requestId);
    if (!request) return;
    if (accepted) {
      // Accept counter: update price and decrement stock
      set((state) => {
        const updatedRequests = state.buyerRequests.map((r) =>
          r.id === requestId ? { ...r, status: 'Accepted', requestedPrice: r.counterPrice } : r
        );
        const updatedCrops = state.crops.map((c) => {
          if (c.id !== request.cropId) return c;
          const newStock = Math.max(0, c.quantityStock - request.requestedQuantity);
          return { ...c, quantityStock: newStock, status: newStock === 0 ? 'SOLD' : c.status };
        });
        return { buyerRequests: updatedRequests, crops: updatedCrops };
      });
      get().addToast(`Counter offer accepted! Deal at ₹${request.counterPrice}/kg.`, 'success');
    } else {
      set((state) => ({
        buyerRequests: state.buyerRequests.map((r) =>
          r.id === requestId ? { ...r, status: 'Rejected' } : r
        ),
      }));
      get().addToast('Counter offer declined.', 'info');
    }
  },

  // 2. Market Prices & Search Indicators (with 8-month price history for sparkline)
  marketPrices: [
    { cropName: 'Alphonso Mangoes', mandi: 'Vashi APMC', currentPrice: 175, trend: '+4%', bestHarvestMonth: 'May - August',
      priceHistory: [140, 148, 155, 160, 158, 165, 168, 175] },
    { cropName: 'Red Onions', mandi: 'Lasalgaon Mandi', currentPrice: 31.5, trend: '+2%', bestHarvestMonth: 'August - October',
      priceHistory: [24, 26, 28, 27, 29, 30, 30.5, 31.5] },
    { cropName: 'Basmati Rice 1121', mandi: 'Karnal APMC', currentPrice: 94, trend: 'Stable', bestHarvestMonth: 'October - November',
      priceHistory: [90, 92, 93, 91, 92, 93, 94, 94] },
    { cropName: 'Hybrid Tomatoes', mandi: 'Kolar APMC', currentPrice: 22, trend: '-3%', bestHarvestMonth: 'Round Year',
      priceHistory: [30, 28, 27, 26, 25, 24, 23, 22] },
  ],

  // 3. AI Prediction Model for Future Demand
  aiDemandPredictions: [
    { cropName: 'Garlic', predictedDemand: 'High Deficit (+45%)', recommendation: 'Recommended to Grow Now for Peak Profit' },
    { cropName: 'Red Onions', predictedDemand: 'High Demand (+20%)', recommendation: 'Good demand expected next quarter' },
    { cropName: 'Yellow Maize', predictedDemand: 'Moderate Demand', recommendation: 'Steady market price expected' },
    { cropName: 'Tomatoes', predictedDemand: 'Surplus Expected', recommendation: 'Stagger planting dates to avoid price dip' }
  ],

  // 4. Buyer Requests
  buyerRequests: [
    {
      id: 'REQ-501',
      cropId: 'CROP-101',
      cropName: 'Alphonso Mangoes',
      farmerName: 'Ramesh Patil',
      farmerContact: '+91 98230 44123',
      buyerName: 'FreshAgro Retail Chains',
      buyerContact: '+91 91122 33445',
      requestedPrice: 165,
      requestedQuantity: 1000,
      status: 'Pending', // 'Pending' | 'Accepted' | 'Rejected'
      date: '2026-08-27',
    },
    {
      id: 'REQ-502',
      cropId: 'CROP-102',
      cropName: 'Red Onions',
      farmerName: 'Suresh Deshmukh',
      farmerContact: '+91 94221 88712',
      buyerName: 'Apex Foods Exporters',
      buyerContact: '+91 98877 66554',
      requestedPrice: 30,
      requestedQuantity: 5000,
      status: 'Pending',
      date: '2026-08-27',
    }
  ],

  // Send Buyer Request to Specific Farmer
  sendBuyerRequest: (crop, buyerName, buyerContact, requestedPrice, requestedQuantity) => {
    const newReq = {
      id: `REQ-${Math.floor(500 + Math.random() * 900)}`,
      cropId: crop.id,
      cropName: crop.cropName,
      farmerName: crop.farmerName,
      farmerContact: crop.farmerContact,
      buyerName,
      buyerContact,
      requestedPrice: Number(requestedPrice),
      requestedQuantity: Number(requestedQuantity),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    set((state) => ({ buyerRequests: [newReq, ...state.buyerRequests] }));
    get().addToast(`Request sent to farmer ${crop.farmerName} for ${crop.cropName}! Notification triggered.`, 'success');
  },

  // Farmer Accept / Reject Buyer Request
  respondToBuyerRequest: (requestId, responseStatus) => {
    const request = get().buyerRequests.find((r) => r.id === requestId);
    if (!request) return;

    set((state) => {
      const updatedRequests = state.buyerRequests.map((r) =>
        r.id === requestId ? { ...r, status: responseStatus } : r
      );

      let updatedCrops = state.crops;

      if (responseStatus === 'Accepted') {
        // Decrement stock by the requested quantity; mark SOLD if stock reaches 0
        updatedCrops = state.crops.map((c) => {
          if (c.id !== request.cropId) return c;
          const newStock = Math.max(0, c.quantityStock - request.requestedQuantity);
          return { ...c, quantityStock: newStock, status: newStock === 0 ? 'SOLD' : c.status };
        });
      }

      return {
        buyerRequests: updatedRequests,
        crops: updatedCrops,
      };
    });

    if (responseStatus === 'Accepted') {
      get().addToast(`Request accepted! ${request.requestedQuantity}kg of "${request.cropName}" allocated to ${request.buyerName}.`, 'success');
    } else {
      get().addToast(`Request from ${request.buyerName} rejected.`, 'info');
    }
  },

  // 5. Farmer Ratings
  ratings: {},  // { farmerName: [{ stars, comment, buyerName, date }] }
  rateFarmer: (farmerName, stars, comment, buyerName) => {
    set((state) => {
      const existing = state.ratings[farmerName] || [];
      return { ratings: { ...state.ratings, [farmerName]: [...existing, { stars, comment, buyerName, date: new Date().toISOString().split('T')[0] }] } };
    });
    get().addToast(`Thank you! You rated ${farmerName} ${stars} star${stars > 1 ? 's' : ''}.`, 'success');
  },
  getFarmerRating: (farmerName) => {
    const reviews = get().ratings[farmerName] || [];
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
    return { avg: Math.round(avg * 10) / 10, count: reviews.length };
  },

  // 6. Transport Requests
  transportRequests: [],
  requestTransport: (crop, buyerName, buyerContact, pickupLocation, deliveryLocation, neededDate) => {
    const req = {
      id: `TRP-${Math.floor(100 + Math.random() * 900)}`,
      cropId: crop.id,
      cropName: crop.cropName,
      farmerName: crop.farmerName,
      farmerContact: crop.farmerContact,
      vehicle: crop.transport?.vehicle || 'Tempo',
      costPerKm: crop.transport?.costPerKm || 12,
      buyerName,
      buyerContact,
      pickupLocation,
      deliveryLocation,
      neededDate,
      status: 'Requested',
      date: new Date().toISOString().split('T')[0],
    };
    set((state) => ({ transportRequests: [req, ...state.transportRequests] }));
    get().addToast(`Transport request sent to ${crop.farmerName} for ${crop.cropName}!`, 'success');
  },
  respondToTransport: (requestId, accepted) => {
    set((state) => ({
      transportRequests: state.transportRequests.map((r) =>
        r.id === requestId ? { ...r, status: accepted ? 'Confirmed' : 'Declined' } : r
      ),
    }));
    const req = get().transportRequests.find((r) => r.id === requestId);
    get().addToast(accepted ? `Transport confirmed for ${req?.cropName}!` : 'Transport request declined.', accepted ? 'success' : 'info');
  },
}));
