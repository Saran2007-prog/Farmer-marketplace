import React from 'react';
import { useStore } from '../../store/useStore';
import { Sprout, ShoppingBag, TrendingUp, Sparkles, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

export const StaticLandingPage = () => {
  const { setActiveRole } = useStore();

  return (
    <div className="space-y-12 py-4">
      {/* Main Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sprout className="h-3.5 w-3.5 text-emerald-600" />
          <span>Agricultural Trade Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Direct Farm-to-Buyer Trade with Market Intelligence
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          AgriMarket bridges local crop producers and commercial buyers directly. Farmers gain AI demand forecasts, harvest guidance, and direct buyer requests, while buyers get transparent quality sourcing and price matching.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveRole('farmer')}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
          >
            Farmer Portal →
          </button>
          <button
            onClick={() => setActiveRole('buyer')}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Buyer Dashboard →
          </button>
        </div>
      </section>

      {/* Feature Breakdown Sections (Matching Requirement Cheat Sheet) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Farmer Features Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Farmer Side</h3>
              <p className="text-xs text-slate-500">Crop production & sales features</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Add Crop Listing:</strong> Easily publish crop stock, asking price, location, and quality grade.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Market Price & Harvest Guidance:</strong> Real-time mandi commodity price lookup and best time for harvesting.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>AI Demand Model:</strong> Actionable guidance helping farmers plan what to plant based on future market demand.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Selling Optimizer:</strong> Calculates best day of selling and peak lifetime price before crop spoilage.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Buyer Requests Inbox:</strong> Accept or reject direct buyer offers; accepting automatically tags the crop status as <strong className="text-emerald-700">SOLD</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Buyer Features Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Buyer Side & Dashboard</h3>
              <p className="text-xs text-slate-500">Commercial sourcing & pricing features</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Parametric Search:</strong> Filter crops and farmers by crop name, price range, location, availability, quality, and stock quantity.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Farmer Directory:</strong> Browse detailed farmer listings including available stock, price, location, and contact numbers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Send Purchase Request:</strong> Specify custom target unit price & stock needed to trigger a direct notification to the specific farmer.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Pricing & Spoilage Matching:</strong> View minimum acceptable price thresholds relative to crop spoilage timeline.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Transparency:</strong> Both farmer and buyer can view complete crop specs, stock, and pricing history.</span>
            </li>
          </ul>
        </div>

      </section>

      {/* Workflow Diagram / Steps */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-4">
        <h3 className="font-bold text-base text-slate-900 text-center">How Trade Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-emerald-800 text-xs block mb-1">1. Crop Listing & AI Forecast</span>
            Farmer lists crop details and checks AI predictions to align future planting with demand.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-blue-800 text-xs block mb-1">2. Buyer Search & Direct Request</span>
            Buyer searches crops/farmers by quality/price and sends a request specifying required quantity & price.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-purple-800 text-xs block mb-1">3. Farmer Acceptance & Status SOLD</span>
            Farmer reviews the notification, accepts the request, and the listing status updates to <strong>SOLD</strong>.
          </div>
        </div>
      </section>
    </div>
  );
};
