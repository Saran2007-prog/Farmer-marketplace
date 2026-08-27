import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Sprout, ShoppingBag, ArrowRight, Leaf, IndianRupee } from 'lucide-react';

export const LoginScreen = () => {
  const { login } = useStore();
  const [step, setStep] = useState(1); // 1: role select, 2: details
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), contact.trim(), selectedRole);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/login_bg.jpg"
          alt="Agricultural fields at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">AgriMarket</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-3">
            India's Smartest<br />Farm-to-Buyer<br />Marketplace
          </h2>
          <p className="text-emerald-200 text-base font-medium max-w-sm">
            Connecting farmers directly to buyers. No middlemen. Better prices. Real-time market intelligence.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Active Farmers', value: '12,400+' },
              { label: 'Buyers Registered', value: '3,800+' },
              { label: 'Avg. Price Gain', value: '22%' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-emerald-200 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-50">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">AgriMarket</span>
        </div>

        <div className="w-full max-w-md">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="animate-fade-in-up space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Welcome Back 👋</h1>
                <p className="text-slate-500 mt-2 text-base">Who are you entering as today?</p>
              </div>

              <div className="space-y-3">
                {/* Farmer Card */}
                <button
                  onClick={() => handleRoleSelect('farmer')}
                  className="w-full group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 text-left flex items-center gap-4 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="h-14 w-14 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <Sprout className="h-7 w-7 text-emerald-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-800 transition-colors">I'm a Farmer</h3>
                    <p className="text-sm text-slate-500 mt-0.5">List crops, track prices, manage buyer requests</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                </button>

                {/* Buyer Card */}
                <button
                  onClick={() => handleRoleSelect('buyer')}
                  className="w-full group p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left flex items-center gap-4 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="h-14 w-14 rounded-xl bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-7 w-7 text-blue-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-800 transition-colors">I'm a Buyer</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Browse crops, find farmers, send purchase requests</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">AgriMarket SIH 2026</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <IndianRupee className="h-4 w-4 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-800 font-medium">No commission. Farmers keep 100% of their earnings.</p>
              </div>
            </div>
          )}

          {/* Step 2: Enter Name & Contact */}
          {step === 2 && (
            <div className="animate-fade-in-up space-y-6">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors mb-2"
              >
                ← Back
              </button>

              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-3 ${selectedRole === 'farmer' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                  {selectedRole === 'farmer' ? <Sprout className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                  {selectedRole === 'farmer' ? 'Farmer Portal' : 'Buyer Dashboard'}
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900">Tell us about you</h1>
                <p className="text-slate-500 mt-2 text-base">Enter your details to get started.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {selectedRole === 'farmer' ? 'Your Full Name *' : 'Your Name / Company Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder={selectedRole === 'farmer' ? 'e.g. Ramesh Patil' : 'e.g. FreshAgro Retail'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98230 44123"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm font-medium focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
                    selectedRole === 'farmer'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 hover:shadow-emerald-200 hover:shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-200 hover:shadow-lg'
                  }`}
                >
                  Enter {selectedRole === 'farmer' ? 'Farmer Portal' : 'Buyer Dashboard'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
