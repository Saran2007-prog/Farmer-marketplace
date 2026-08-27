import React from 'react';
import { Navbar } from './components/Navbar';
import { useStore } from './store/useStore';
import { FarmerSide } from './features/farmer/FarmerSide';
import { BuyerSide } from './features/buyer/BuyerSide';
import { LoginScreen } from './features/auth/LoginScreen';

export function App() {
  const { isLoggedIn, currentUser, activeRole } = useStore();

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const userRole = currentUser?.role || activeRole;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {userRole === 'farmer' && <FarmerSide />}
        {userRole === 'buyer' && <BuyerSide />}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500 font-semibold">
        Smart Agricultural Marketplace Platform • AgriMarket SIH 2026
      </footer>
    </div>
  );
}

export default App;
