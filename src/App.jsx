import React from 'react';
import { Navbar } from './components/Navbar';
import { useStore } from './store/useStore';
import { StaticLandingPage } from './features/landing/StaticLandingPage';
import { FarmerSide } from './features/farmer/FarmerSide';
import { BuyerSide } from './features/buyer/BuyerSide';

export function App() {
  const { activeRole } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeRole === 'landing' && <StaticLandingPage />}
        {activeRole === 'farmer' && <FarmerSide />}
        {activeRole === 'buyer' && <BuyerSide />}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 font-semibold">
        Smart Agricultural Marketplace Platform • Farmer Side & Buyer Dashboard
      </footer>
    </div>
  );
}

export default App;
