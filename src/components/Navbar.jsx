import React from 'react';
import { useStore } from '../store/useStore';
import { Sprout, ShoppingBag, Home, Bell } from 'lucide-react';

export const Navbar = () => {
  const { activeRole, setActiveRole, toasts, removeToast, buyerRequests } = useStore();

  const pendingCount = buyerRequests.filter((r) => r.status === 'Pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveRole('landing')} 
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg">
            🌾
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight block leading-tight">
              AgriMarket
            </span>
            <span className="text-[10px] text-slate-500 font-medium leading-none block">
              Direct Farmer & Buyer Platform
            </span>
          </div>
        </div>

        {/* Navbar Navigation Links (Home, Farmer Portal, Buyer Dashboard) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveRole('landing')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeRole === 'landing'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Home className="h-4 w-4 text-slate-500" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveRole('farmer')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors relative ${
              activeRole === 'farmer'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sprout className="h-4 w-4 text-emerald-600" />
            <span>Farmer Portal</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveRole('buyer')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeRole === 'buyer'
                ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="h-4 w-4 text-blue-600" />
            <span>Buyer Dashboard</span>
          </button>
        </nav>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white shadow-lg border border-slate-800 animate-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="h-4 w-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-200 font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white text-xs font-bold pl-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </header>
  );
};
