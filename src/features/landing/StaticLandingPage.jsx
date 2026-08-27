import React from 'react';
import { useStore } from '../../store/useStore';
import { Sprout, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const StaticLandingPage = () => {
  const { setActiveRole } = useStore();

  return (
    <div className="space-y-10 py-2">
      {/* Hero Banner with Background Image */}
      <section className="relative overflow-hidden rounded-2xl text-white p-8 sm:p-14 shadow-lg flex items-center min-h-[340px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/hero_farm_bg.png')` }}
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold tracking-wide">
            🌱 AgriMarket Platform
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Direct Farm-to-Buyer Marketplace
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-medium max-w-lg">
            Direct trade between crop producers and buyers with real-time prices & AI demand insights.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveRole('farmer')}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>Farmer Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveRole('buyer')}
              className="px-5 py-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 backdrop-blur-md transition-colors flex items-center gap-1.5"
            >
              <span>Buyer Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Concise Portal Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Farmer Portal Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Farmer Side</h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Add crop listings with stock, price, location & quality</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Search current market prices & harvest timing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>AI prediction model for future demand & grow plan</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Accept/Reject buyer requests (auto-tags status as <strong>SOLD</strong>)</span>
            </li>
          </ul>
        </div>

        {/* Buyer Portal Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Buyer Dashboard</h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Search crops & farmers by quality, price & location</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Farmer directory with stock & contact details</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Send direct purchase request with target price & quantity</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Spoilage time & minimum acceptable price matching</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3-Step Simple Workflow */}
      <section className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-3">
        <h3 className="font-bold text-sm text-slate-900 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 text-center">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">1. Farmer Lists Crop</strong>
            Add stock, price & view AI crop demand.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">2. Buyer Sends Request</strong>
            Search crops & request price/quantity.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1">3. Accept & Tag SOLD</strong>
            Farmer accepts request, updating crop to SOLD.
          </div>
        </div>
      </section>
    </div>
  );
};
