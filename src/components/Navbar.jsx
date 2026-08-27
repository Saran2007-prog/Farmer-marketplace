import React from 'react';
import { useStore } from '../store/useStore';
import { Sprout, ShoppingBag, Bell, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { activeRole, toasts, removeToast, buyerRequests, currentUser, logout } = useStore();

  const userRole = currentUser?.role || activeRole;
  const pendingCount = buyerRequests.filter((r) => r.status === 'Pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-default group">
          <div className="h-9 w-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-110 shadow-sm">
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

        <div className="flex items-center gap-3">
          {/* Active Single Dashboard Badge */}
          <div className="flex items-center gap-2">
            {userRole === 'farmer' && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-sm shadow-sm relative">
                <Sprout className="h-4 w-4 text-emerald-600 animate-pulse" />
                <span>Farmer Portal</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-600 text-white font-bold animate-pulse-slow shadow-sm">
                    {pendingCount}
                  </span>
                )}
              </div>
            )}

            {userRole === 'buyer' && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200 text-sm shadow-sm">
                <ShoppingBag className="h-4 w-4 text-blue-600" />
                <span>Buyer Dashboard</span>
              </div>
            )}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${currentUser.role === 'farmer' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate leading-tight">{currentUser.name}</span>
                  <span className="text-[9px] font-semibold text-slate-500 capitalize leading-none">{currentUser.role}</span>
                </div>
              </div>
            )}

            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all duration-200 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white shadow-lg border border-slate-800 animate-fade-in-up"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="h-4 w-4 text-emerald-400 shrink-0" />
              <p className="text-sm text-slate-200 font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white text-sm font-bold pl-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </header>
  );
};
