import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { SparklineChart } from '../../components/ChartComponents';
import {
  Plus, Search, Check, X, Sparkles, MapPin, Bell,
  TrendingUp, Trash2, Calendar, Package, ShoppingCart,
  BarChart3, Inbox, Pencil, History, ArrowLeftRight, IndianRupee,
  Download, Truck, AlertTriangle
} from 'lucide-react';

// Spoilage urgency bar
const SpoilageBar = ({ days }) => {
  const { t } = useTranslation();
  const max = 150;
  const pct = Math.min(100, (days / max) * 100);
  const color = days <= 5 ? 'bg-rose-500' : days <= 15 ? 'bg-amber-500' : days <= 40 ? 'bg-yellow-400' : 'bg-emerald-500';
  const labelKey = days <= 5 ? 'spoilage_critical' : days <= 15 ? 'spoilage_urgent' : days <= 40 ? 'spoilage_moderate' : 'spoilage_safe';
  const label = t(labelKey);
  const textColor = days <= 5 ? 'text-rose-600' : days <= 15 ? 'text-amber-600' : days <= 40 ? 'text-yellow-600' : 'text-emerald-600';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-medium">
        <span className="text-slate-400">{t('spoilage_risk')}</span>
        <span className={`font-bold ${textColor}`}>{t('spoilage_days_left', { label, days })}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const CATEGORY_IMAGES = {
  Fruits: '/crop_mangoes.jpg',
  Vegetables: '/crop_tomatoes.jpg',
  Grains: '/crop_rice.jpg',
  Pulses: '/crop_onions.jpg',
  Spices: '/crop_onions.jpg',
  Oilseeds: '/crop_rice.jpg',
};

const CropForm = ({ formData, setFormData, onSubmit, submitLabel, onCancel }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-3">
        <p className="text-xs font-bold text-emerald-800">{t('farmer_identity')}</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('your_name')}</label>
            <input type="text" required placeholder="Ramesh Patil" value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('your_contact')}</label>
            <input type="text" required placeholder="+91 98230 44123" value={formData.farmerContact}
              onChange={(e) => setFormData({ ...formData, farmerContact: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">{t('crop_name')}</label>
        <input type="text" required placeholder="e.g. Alphonso Mangoes" value={formData.cropName}
          onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('category')}</label>
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
            {['Fruits', 'Vegetables', 'Grains', 'Pulses', 'Spices', 'Oilseeds'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('quality_grade')}</label>
          <select value={formData.quality} onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
            <option value="Grade A">{t('grade_a')}</option>
            <option value="Grade B">{t('grade_b')}</option>
            <option value="Grade C">{t('grade_c')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('available_stock')}</label>
          <input type="number" required placeholder="2500" value={formData.quantityStock}
            onChange={(e) => setFormData({ ...formData, quantityStock: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('asking_price_label')}</label>
          <input type="number" required placeholder="180" value={formData.askingPrice}
            onChange={(e) => setFormData({ ...formData, askingPrice: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('location')}</label>
          <input type="text" required placeholder="Nashik, Maharashtra" value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{t('harvesting_date')}</label>
          <input type="date" required value={formData.harvestingDate}
            onChange={(e) => setFormData({ ...formData, harvestingDate: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3">
        <button type="button" onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors">{t('cancel')}</button>
        <button type="submit"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-xs transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export const FarmerSide = () => {
  const { t } = useTranslation();
  const {
    crops, addCrop, editCrop, deleteCrop,
    marketPrices, aiDemandPredictions,
    buyerRequests, respondToBuyerRequest, counterOfferRequest,
    transportRequests, respondToTransport,
    currentUser
  } = useStore();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'history' | 'transport'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [counterModal, setCounterModal] = useState(null);
  const [counterPrice, setCounterPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Spoilage Risk Crops (<= 7 days)
  const urgentSpoilageCrops = crops.filter(c => c.spoilageDaysRemaining <= 7 && c.status === 'Active');

  // CSV Export function
  const downloadCSVReport = () => {
    const headers = ['Crop ID', 'Crop Name', 'Category', 'Stock (kg)', 'Asking Price (₹/kg)', 'Location', 'Harvest Date', 'Spoilage Days Left', 'Status'];
    const rows = crops.map(c => [c.id, `"${c.cropName}"`, c.category, c.quantityStock, c.askingPrice, `"${c.location}"`, c.harvestingDate, c.spoilageDaysRemaining, c.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Farmer_Crops_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const emptyForm = {
    cropName: '', category: 'Fruits', quantityStock: '', askingPrice: '',
    location: currentUser?.contact ? '' : '',
    quality: 'Grade A',
    farmerName: currentUser?.name || '',
    farmerContact: currentUser?.contact || '',
    harvestingDate: new Date().toISOString().split('T')[0]
  };
  const [formData, setFormData] = useState(emptyForm);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantityStock || !formData.askingPrice || !formData.farmerName || !formData.location) return;
    addCrop({ ...formData, image: CATEGORY_IMAGES[formData.category] || '/crop_mangoes.jpg' });
    setShowAddModal(false);
    setFormData(emptyForm);
  };

  const handleEditOpen = (crop) => {
    setEditingCrop(crop);
    setFormData({
      cropName: crop.cropName, category: crop.category, quantityStock: crop.quantityStock,
      askingPrice: crop.askingPrice, location: crop.location, quality: crop.quality,
      farmerName: crop.farmerName, farmerContact: crop.farmerContact,
      harvestingDate: crop.harvestingDate
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editCrop(editingCrop.id, { ...formData, image: CATEGORY_IMAGES[formData.category] || editingCrop.image });
    setEditingCrop(null);
    setFormData(emptyForm);
  };

  const handleDelete = (cropId) => {
    setDeletingId(cropId);
    setTimeout(() => { deleteCrop(cropId); setDeletingId(null); }, 300);
  };

  const handleCounterSubmit = (e) => {
    e.preventDefault();
    if (!counterPrice) return;
    counterOfferRequest(counterModal.requestId, counterPrice);
    setCounterModal(null);
    setCounterPrice('');
  };

  const filteredMarketPrices = marketPrices.filter((m) =>
    m.cropName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = buyerRequests.filter((r) => r.status === 'Pending');
  const acceptedRequests = buyerRequests.filter((r) => r.status === 'Accepted');
  const totalActive = crops.filter((c) => c.status === 'Active').length;
  const totalSold = crops.filter((c) => c.status === 'SOLD').length;
  const totalRevenue = acceptedRequests.reduce((sum, r) => sum + (r.requestedPrice * r.requestedQuantity), 0);

  // Helper: translate request status
  const statusKey = (status) => {
    if (status === 'Accepted') return t('status_accepted');
    if (status === 'Rejected') return t('status_rejected');
    if (status === 'Counter Offered') return t('status_counter_offered');
    return t('pending');
  };

  return (
    <div className="space-y-6 py-2">
      {/* Spoilage Urgency Warning Banner */}
      {urgentSpoilageCrops.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 text-white p-4 rounded-xl shadow-md flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-200 shrink-0" />
            <div>
              <p className="font-extrabold text-sm sm:text-base">
                ⚠️ {t(urgentSpoilageCrops.length === 1 ? 'spoilage_warning_title' : 'spoilage_warning_title_plural', { count: urgentSpoilageCrops.length })}
              </p>
              <p className="text-xs text-amber-100 mt-0.5">
                {urgentSpoilageCrops.map(c => `${c.cropName} (${t('spoilage_days_remaining', { days: c.spoilageDaysRemaining })})`).join(', ')} — {t('spoilage_warning_body', { crops: '' }).replace(' — ', '')}
              </p>
            </div>
          </div>
          <button onClick={() => {
            const cropToEdit = urgentSpoilageCrops[0];
            setEditingCrop(cropToEdit);
          }} className="px-3.5 py-1.5 rounded-lg bg-white text-rose-700 font-extrabold text-xs shrink-0 hover:bg-amber-50 transition-all shadow">
            {t('discount_now')}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="glass-card p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up stagger-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t('farmer_workspace')} {currentUser && <span className="text-emerald-600">— {currentUser.name}</span>}
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{t('farmer_workspace_subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={downloadCSVReport} title="Export crop listings report to CSV"
            className="px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm">
            <Download className="h-4 w-4 text-emerald-600" /><span>{t('export_report')}</span>
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-semibold text-sm shadow-sm flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 shrink-0">
            <Plus className="h-4 w-4" /><span>{t('add_crop_listing')}</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up stagger-1">
        {[
          { icon: <Package className="h-5 w-5 text-emerald-700" />, bg: 'bg-emerald-100', label: t('total_listed'), value: crops.length },
          { icon: <BarChart3 className="h-5 w-5 text-blue-700" />, bg: 'bg-blue-100', label: t('active'), value: totalActive },
          { icon: <ShoppingCart className="h-5 w-5 text-rose-700" />, bg: 'bg-rose-100', label: t('sold'), value: totalSold },
          { icon: <Bell className="h-5 w-5 text-amber-700" />, bg: 'bg-amber-100', label: t('pending_requests'), value: pendingRequests.length },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 rounded-xl flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue stat */}
      {totalRevenue > 0 && (
        <div className="glass-card p-4 rounded-xl flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 animate-fade-in-up">
          <IndianRupee className="h-6 w-6 text-emerald-700 shrink-0" />
          <div>
            <p className="text-xs text-emerald-700 font-semibold">{t('total_revenue_label')}</p>
            <p className="text-2xl font-extrabold text-emerald-800">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Buyer Requests Inbox */}
      <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-600" />
            <h2 className="font-bold text-base text-slate-900">{t('incoming_buyer_requests')}</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-sm font-semibold border border-amber-200">
            {t('pending_count', { count: pendingRequests.length })}
          </span>
        </div>

        {buyerRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
            <Inbox className="h-12 w-12 text-slate-300" />
            <p className="font-bold text-slate-400 text-sm">{t('no_buyer_requests')}</p>
            <p className="text-xs text-slate-400">{t('no_buyer_requests_sub')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyerRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-lg bg-white border border-slate-200 space-y-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400">ID: {req.id} • {req.date}</span>
                    <h3 className="font-bold text-sm text-slate-900">{req.cropName}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{t('buyer')}: <strong>{req.buyerName}</strong> {req.buyerContact && `(${req.buyerContact})`}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    req.status === 'Accepted' ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : req.status === 'Rejected' ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : req.status === 'Counter Offered' ? 'bg-purple-50 text-purple-800 border-purple-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold'
                  }`}>{statusKey(req.status)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-medium">{t('buyers_offered_price')}</span>
                    <span className="font-bold text-emerald-700">₹{req.requestedPrice}/kg</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-medium">{t('quantity_needed')}</span>
                    <span className="font-bold text-slate-900">{req.requestedQuantity} kg</span>
                  </div>
                  {req.counterPrice && (
                    <div className="col-span-2 pt-1 border-t border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-medium">{t('your_counter_offer')}</span>
                      <span className="font-bold text-purple-700">₹{req.counterPrice}/kg</span>
                    </div>
                  )}
                </div>

                {req.status === 'Pending' && (
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => respondToBuyerRequest(req.id, 'Accepted')}
                      className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
                      <Check className="h-4 w-4" /><span>{t('accept')}</span>
                    </button>
                    <button
                      onClick={() => { setCounterModal({ requestId: req.id, buyerName: req.buyerName, originalPrice: req.requestedPrice }); setCounterPrice(req.requestedPrice); }}
                      className="flex-1 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95 border border-purple-300">
                      <ArrowLeftRight className="h-3.5 w-3.5" /><span>{t('counter')}</span>
                    </button>
                    <button onClick={() => respondToBuyerRequest(req.id, 'Rejected')}
                      className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-all duration-200 hover:scale-105 active:scale-95">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {(req.status === 'Accepted' || req.status === 'Rejected' || req.status === 'Counter Offered') && (
                  <p className="text-xs text-slate-500 font-medium text-center py-1">
                    {t('status_label')}: <strong className={req.status === 'Accepted' ? 'text-emerald-700' : req.status === 'Counter Offered' ? 'text-purple-700' : 'text-slate-700'}>{statusKey(req.status)}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Prediction Model — Premium Full-Width Cards */}
      <div className="glass-card rounded-2xl p-6 space-y-5 animate-fade-in-up stagger-3">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-md">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-slate-900">{t('ai_demand_title')}</h2>
            <p className="text-sm text-slate-500">{t('ai_demand_subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiDemandPredictions.map((ai, i) => {
            const palettes = [
              { bg: 'from-purple-600 to-purple-900', badge: 'bg-white/20 text-white', icon: '🌱', border: 'border-purple-200' },
              { bg: 'from-emerald-600 to-emerald-900', badge: 'bg-white/20 text-white', icon: '📈', border: 'border-emerald-200' },
              { bg: 'from-blue-600 to-blue-900', badge: 'bg-white/20 text-white', icon: '🌾', border: 'border-blue-200' },
              { bg: 'from-amber-500 to-orange-700', badge: 'bg-white/20 text-white', icon: '⚠️', border: 'border-amber-200' },
            ];
            const p = palettes[i % palettes.length];
            return (
              <div key={i} className={`relative rounded-2xl overflow-hidden border ${p.border} shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5`}>
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${p.bg} p-5 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-3xl mb-2 block">{p.icon}</span>
                      <h3 className="font-extrabold text-xl leading-tight">{ai.cropName}</h3>
                    </div>
                    <span className={`${p.badge} backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold border border-white/30 text-right max-w-[140px] text-center`}>
                      {ai.predictedDemand}
                    </span>
                  </div>
                </div>
                {/* Recommendation body */}
                <div className="bg-white p-4">
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    💡 <span className="font-semibold">{t('recommendation_label')}:</span> {ai.recommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Market Prices — Premium Large Cards */}
      <div className="glass-card rounded-2xl p-6 space-y-5 animate-fade-in-up stagger-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-slate-900">{t('live_mandi_title')}</h2>
              <p className="text-sm text-slate-500">{t('live_mandi_subtitle')}</p>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input type="text" placeholder={t('search_crop_placeholder')} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-slate-200 text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" />
          </div>
        </div>

        {filteredMarketPrices.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center space-y-2">
            <Search className="h-12 w-12 text-slate-300" />
            <p className="font-bold text-slate-400">{t('no_crops_found', { query: searchQuery })}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMarketPrices.map((item, idx) => {
              const isUp = item.trend.startsWith('+');
              const isDown = item.trend.startsWith('-');
              return (
                <div key={idx} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group">
                  {/* Top color stripe */}
                  <div className={`h-2 w-full ${isUp ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : isDown ? 'bg-gradient-to-r from-rose-400 to-rose-600' : 'bg-gradient-to-r from-slate-300 to-slate-400'}`} />
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 leading-tight">{item.cropName}</h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{item.mandi}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-sm font-extrabold ${
                        isUp ? 'bg-emerald-100 text-emerald-700'
                        : isDown ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.trend}
                      </span>
                    </div>

                    {/* Price — BIG */}
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide">{t('current_price')}</p>
                      <p className={`text-3xl font-extrabold mt-0.5 ${
                        isUp ? 'text-emerald-700' : isDown ? 'text-rose-600' : 'text-slate-800'
                      }`}>₹{item.currentPrice}<span className="text-base font-semibold text-slate-400">{t('per_kg')}</span></p>
                    </div>

                    {/* Sparkline Price History Chart */}
                    <div className="py-1">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">{t('month_trend')}</p>
                      <SparklineChart data={item.priceHistory} isUp={isUp} isDown={isDown} />
                    </div>

                    {/* Harvest Window */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{t('best_harvest_window')}</p>
                        <p className="text-sm font-bold text-slate-800">{item.bestHarvestMonth}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Crop Listings + Transaction History + Transport Tabs */}
      <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in-up stagger-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setActiveTab('listings')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'listings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Package className="h-3.5 w-3.5" /> {t('tab_my_listings', { count: crops.length })}
            </button>
            <button onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
              <History className="h-3.5 w-3.5" /> {t('tab_transaction_history', { count: acceptedRequests.length })}
            </button>
            <button onClick={() => setActiveTab('transport')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 relative ${activeTab === 'transport' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Truck className="h-3.5 w-3.5 text-blue-600" /> {t('tab_transport', { count: transportRequests.length })}
              {transportRequests.filter(t => t.status === 'Requested').length > 0 && (
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          crops.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <Package className="h-14 w-14 text-slate-300" />
              <p className="font-bold text-slate-400">{t('no_listings')}</p>
              <button onClick={() => setShowAddModal(true)}
                className="mt-2 px-4 py-2 rounded-lg bg-emerald-700 text-white font-semibold text-sm flex items-center gap-1.5 hover:bg-emerald-800 transition-colors">
                <Plus className="h-4 w-4" /> {t('add_first_crop')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crops.map((c) => (
                <div key={c.id}
                  className={`p-4 rounded-lg bg-white border border-slate-200 space-y-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${deletingId === c.id ? 'opacity-0 scale-95' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {c.image && (
                        <div className="h-16 w-16 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img src={c.image} alt={c.cropName} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">{c.quality} • {c.category}</span>
                        <h3 className="font-bold text-base text-slate-900 mt-1">{c.cropName}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3 text-slate-400" />{c.location}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Calendar className="h-3 w-3 text-slate-400" />{t('harvested')}: <strong>{c.harvestingDate}</strong></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${c.status === 'SOLD' ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'}`}>{c.status}</span>
                      {c.status !== 'SOLD' && (
                        <div className="flex gap-1">
                          <button onClick={() => handleEditOpen(c)} title="Edit"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(c.id)} title="Delete"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-200"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <div><span className="text-slate-400 text-[10px] block font-medium">{t('asking_price')}</span><span className="font-bold text-emerald-700">₹{c.askingPrice}/kg</span></div>
                    <div><span className="text-slate-400 text-[10px] block font-medium">{t('stock_left')}</span><span className="font-bold text-slate-900">{c.quantityStock.toLocaleString()} kg</span></div>
                    <div><span className="text-slate-400 text-[10px] block font-medium">{t('min_acceptable')}</span><span className="font-bold text-amber-700">₹{c.minAcceptablePrice}/kg</span></div>
                    <div><span className="text-slate-400 text-[10px] block font-medium">{t('max_lifetime')}</span><span className="font-bold text-purple-700">₹{c.maxLifetimePrice}/kg</span></div>
                  </div>

                  <SpoilageBar days={c.spoilageDaysRemaining} />
                </div>
              ))}
            </div>
          )
        )}

        {/* Transaction History Tab */}
        {activeTab === 'history' && (
          acceptedRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <History className="h-14 w-14 text-slate-300" />
              <p className="font-bold text-slate-400">{t('no_transactions')}</p>
              <p className="text-sm text-slate-400">{t('no_transactions_sub')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {acceptedRequests.map((r) => (
                <div key={r.id} className="p-4 rounded-lg bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 hover:shadow-md">
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">{r.id} • {r.date}</p>
                    <h3 className="font-bold text-slate-900">{r.cropName}</h3>
                    <p className="text-xs text-slate-500">{t('buyer')}: <strong>{r.buyerName}</strong> {r.buyerContact && `• ${r.buyerContact}`}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-medium">{t('quantity_sold')}</p>
                      <p className="font-bold text-slate-900 text-sm">{r.requestedQuantity.toLocaleString()} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-medium">{t('price')}</p>
                      <p className="font-bold text-blue-700 text-sm">₹{r.requestedPrice}/kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-medium">{t('revenue')}</p>
                      <p className="font-bold text-emerald-700 text-sm">₹{(r.requestedPrice * r.requestedQuantity).toLocaleString()}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">{t('status_accepted')}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Transport Tab */}
        {activeTab === 'transport' && (
          transportRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <Truck className="h-14 w-14 text-slate-300" />
              <p className="font-bold text-slate-400">{t('no_transport')}</p>
              <p className="text-sm text-slate-400">{t('no_transport_sub')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transportRequests.map((tr) => (
                <div key={tr.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">{tr.id}</span>
                      <h3 className="font-extrabold text-slate-900 text-sm mt-1">{tr.cropName} {t('transport_suffix')}</h3>
                      <p className="text-xs text-slate-500">{t('buyer')}: <strong>{tr.buyerName}</strong> ({tr.buyerContact})</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      tr.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : tr.status === 'Declined' ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-blue-100 text-blue-800 font-extrabold border border-blue-300 animate-pulse'
                    }`}>{tr.status}</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p>🚚 <strong>{t('vehicle')}:</strong> {tr.vehicle} (@ ₹{tr.costPerKm}/km)</p>
                    <p>📍 <strong>{t('pickup_location')}:</strong> {tr.pickupLocation}</p>
                    <p>🏁 <strong>{t('delivery_location')}:</strong> {tr.deliveryLocation}</p>
                    <p>📅 <strong>{t('date_needed')}:</strong> {tr.neededDate}</p>
                  </div>
                  {tr.status === 'Requested' && (
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => respondToTransport(tr.id, true)}
                        className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95">
                        ✓ {t('confirm_booking')}
                      </button>
                      <button onClick={() => respondToTransport(tr.id, false)}
                        className="flex-1 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all hover:scale-105 active:scale-95">
                        ✕ {t('decline')}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Add Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-slate-900">{t('add_new_crop_title')}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <p className="text-xs text-slate-500 mb-4">{t('add_new_crop_sub')}</p>
            <CropForm formData={formData} setFormData={setFormData} onSubmit={handleAddSubmit} submitLabel={t('publish_listing')} onCancel={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {/* Edit Crop Modal */}
      {editingCrop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-base text-slate-900">{t('edit_crop_title')}</h3>
              <button onClick={() => setEditingCrop(null)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <p className="text-xs text-slate-500 mb-4">{t('edit_crop_sub', { cropName: editingCrop.cropName })}</p>
            <CropForm formData={formData} setFormData={setFormData} onSubmit={handleEditSubmit} submitLabel={t('save_changes')} onCancel={() => setEditingCrop(null)} />
          </div>
        </div>
      )}

      {/* Counter Offer Modal */}
      {counterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{t('counter_offer_title')}</h3>
                <p className="text-xs text-slate-500">{t('counter_offer_to', { buyerName: counterModal.buyerName })}</p>
              </div>
              <button onClick={() => setCounterModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCounterSubmit} className="mt-4 space-y-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500">{t('buyers_offered_price_modal')}: </span>
                <strong className="text-slate-900">₹{counterModal.originalPrice}/kg</strong>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t('your_counter_price')}</label>
                <input type="number" required autoFocus value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setCounterModal(null)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">{t('cancel')}</button>
                <button type="submit"
                  className="flex-1 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95">
                  <ArrowLeftRight className="h-4 w-4" /> {t('send_counter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
