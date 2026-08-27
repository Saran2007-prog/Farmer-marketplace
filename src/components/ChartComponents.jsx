import React from 'react';

/**
 * Mini SVG sparkline chart for price trends.
 * @param {number[]} data - Array of price points
 * @param {string} color - Stroke color class or hex
 * @param {string} fillColor - Fill gradient start color
 */
export const SparklineChart = ({ data = [], isUp, isDown }) => {
  if (!data || data.length < 2) return null;

  const w = 120, h = 40, pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + ((max - v) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const polyline = pts.join(' ');
  // Build area path (close below)
  const first = pts[0];
  const last = pts[pts.length - 1];
  const area = `M${first} L${pts.join(' L')} L${last.split(',')[0]},${h} L${first.split(',')[0]},${h} Z`;

  const stroke = isUp ? '#10b981' : isDown ? '#f43f5e' : '#94a3b8';
  const fillStart = isUp ? '#10b98130' : isDown ? '#f43f5e30' : '#94a3b820';
  const fillEnd = isUp ? '#10b98105' : isDown ? '#f43f5e05' : '#94a3b805';

  const gradId = `sg-${isUp ? 'up' : isDown ? 'dn' : 'st'}-${Math.random().toString(36).slice(2,6)}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillStart} />
          <stop offset="100%" stopColor={fillEnd} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <polyline points={polyline} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      <circle cx={pts[pts.length-1].split(',')[0]} cy={pts[pts.length-1].split(',')[1]} r="3" fill={stroke} />
    </svg>
  );
};

/**
 * Star rating display
 */
export const StarRating = ({ rating = 0, count = 0, size = 'sm' }) => {
  const sz = size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map((s) => (
          <span key={s} className={`${sz} ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
        ))}
      </div>
      {count > 0 && <span className="text-xs text-slate-500 font-medium">{rating} ({count})</span>}
      {count === 0 && <span className="text-xs text-slate-400">No ratings yet</span>}
    </div>
  );
};

/**
 * Interactive star picker
 */
export const StarPicker = ({ value, onChange }) => {
  const [hover, setHover] = React.useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-all duration-100 hover:scale-125 active:scale-110 ${s <= (hover || value) ? 'text-amber-400' : 'text-slate-200'}`}
        >★</button>
      ))}
    </div>
  );
};
