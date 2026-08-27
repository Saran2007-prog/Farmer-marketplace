import React from 'react';
import { useStore } from '../../store/useStore';
import { Sprout, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const StaticLandingPage = () => {
  const { setActiveRole } = useStore();

  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner with Background Image */}
      <section className="relative overflow-hidden rounded-2xl text-white p-8 sm:p-14 shadow-lg flex items-center min-h-[360px] animate-fade-in-up stagger-1">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('/hero_farm_bg.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-bold tracking-wide shadow-sm">
            <Sprout className="h-4 w-4 text-emerald-200 animate-pulse" />
            <span>Direct Agricultural Trade Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Direct Farm-to-Buyer Trade with Market Intelligence
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-medium max-w-lg leading-relaxed">
            AgriMarket bridges local crop producers and commercial buyers directly. Farmers gain AI demand forecasts, harvest guidance, and direct buyer requests, while buyers get transparent quality sourcing and price matching.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveRole('farmer')}
              className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Farmer Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveRole('buyer')}
              className="px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Buyer Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Breakdown Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Farmer Features Card */}
        <div className="p-6 rounded-2xl glass-card animate-fade-in-up stagger-3 space-y-5 flex flex-col">
          <div className="rounded-xl overflow-hidden shadow-sm h-48 w-full shrink-0">
            <img src="/farmer_feature.jpg" alt="Farmer Feature" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Farmer Side</h3>
              <p className="text-sm text-slate-500">Crop production & sales features</p>
            </div>
          </div>

          <ul className="space-y-4 text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Add Crop Listing:</strong> Easily publish crop stock, asking price, location, and quality grade.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Market Price & Harvest Guidance:</strong> Real-time mandi commodity price lookup and best time for harvesting.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>AI Demand Model:</strong> Actionable guidance helping farmers plan what to plant based on future market demand.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Selling Optimizer:</strong> Calculates best day of selling and peak lifetime price before crop spoilage.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Buyer Requests Inbox:</strong> Accept or reject direct buyer offers; accepting automatically tags the crop status as <strong className="text-emerald-700">SOLD</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Buyer Features Card */}
        <div className="p-6 rounded-2xl glass-card animate-fade-in-up stagger-4 space-y-5 flex flex-col">
          <div className="rounded-xl overflow-hidden shadow-sm h-48 w-full shrink-0">
            <img src="/buyer_feature.jpg" alt="Buyer Feature" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Buyer Side & Dashboard</h3>
              <p className="text-sm text-slate-500">Commercial sourcing & pricing features</p>
            </div>
          </div>

          <ul className="space-y-4 text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Parametric Search:</strong> Filter crops and farmers by crop name, price range, location, availability, quality, and stock quantity.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Farmer Directory:</strong> Browse detailed farmer listings including available stock, price, location, and contact numbers.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Send Purchase Request:</strong> Specify custom target unit price & stock needed to trigger a direct notification to the specific farmer.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Pricing & Spoilage Matching:</strong> View minimum acceptable price thresholds relative to crop spoilage timeline.</span>
            </li>
            <li className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Transparency:</strong> Both farmer and buyer can view complete crop specs, stock, and pricing history.</span>
            </li>
          </ul>
        </div>

      </section>

      {/* Workflow Diagram / Steps */}
      <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-4 animate-fade-in-up stagger-4">
        <h3 className="font-bold text-lg text-slate-900 text-center">How Trade Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white group">
            <span className="font-bold text-emerald-800 text-sm block mb-1.5 group-hover:text-emerald-600 transition-colors">1. Crop Listing & AI Forecast</span>
            Farmer lists crop details and checks AI predictions to align future planting with demand.
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white group">
            <span className="font-bold text-blue-800 text-sm block mb-1.5 group-hover:text-blue-600 transition-colors">2. Buyer Search & Direct Request</span>
            Buyer searches crops/farmers by quality/price and sends a request specifying required quantity & price.
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white group">
            <span className="font-bold text-purple-800 text-sm block mb-1.5 group-hover:text-purple-600 transition-colors">3. Farmer Acceptance & Status SOLD</span>
            Farmer reviews the notification, accepts the request, and the listing status updates to <strong>SOLD</strong>.
          </div>
        </div>
      </section>
    </div>
  );
};
