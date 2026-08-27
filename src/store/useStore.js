import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Active Navigation Tab: 'landing' | 'farmer' | 'buyer'
  activeRole: 'landing',
  setActiveRole: (role) => set({ activeRole: role }),

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
      quantityStock: 2500, // in kg
      askingPrice: 180, // per kg
      minAcceptablePrice: 150, // per kg (within spoilage time)
      maxLifetimePrice: 210, // peak selling price
      location: 'Ratnagiri, Maharashtra',
      quality: 'Grade A',
      harvestingDate: '2026-08-20',
      bestHarvestTime: 'Completed (Optimal)',
      bestSellingDay: 'Within next 5 days',
      spoilageDaysRemaining: 9,
      status: 'Active', // 'Active' | 'SOLD'
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
      spoilageDaysRemaining: 6,
      status: 'Active',
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
    };
    set((state) => ({ crops: [item, ...state.crops] }));
    get().addToast(`Crop listing for "${item.cropName}" published successfully!`, 'success');
  },

  // 2. Market Prices & Search Indicators
  marketPrices: [
    { cropName: 'Alphonso Mangoes', mandi: 'Vashi APMC', currentPrice: 175, trend: '+4%', bestHarvestMonth: 'May - August' },
    { cropName: 'Red Onions', mandi: 'Lasalgaon Mandi', currentPrice: 31.5, trend: '+2%', bestHarvestMonth: 'August - October' },
    { cropName: 'Basmati Rice 1121', mandi: 'Karnal APMC', currentPrice: 94, trend: 'Stable', bestHarvestMonth: 'October - November' },
    { cropName: 'Hybrid Tomatoes', mandi: 'Kolar APMC', currentPrice: 22, trend: '-3%', bestHarvestMonth: 'Round Year' },
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

      // If accepted, update crop listing status to SOLD
      let updatedCrops = state.crops;

      if (responseStatus === 'Accepted') {
        updatedCrops = state.crops.map((c) =>
          c.id === request.cropId ? { ...c, status: 'SOLD' } : c
        );
      }

      return {
        buyerRequests: updatedRequests,
        crops: updatedCrops,
      };
    });

    if (responseStatus === 'Accepted') {
      get().addToast(`Request accepted! Crop "${request.cropName}" status updated to SOLD.`, 'success');
    } else {
      get().addToast(`Request rejected.`, 'info');
    }
  }
}));
