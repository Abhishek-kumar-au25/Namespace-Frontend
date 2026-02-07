import React from 'react';

const PartnerStrip = ({ partners = [] }) => {
  return (
    <div className="partner-strip overflow-hidden">
      <div className="flex gap-6 items-center p-4 overflow-x-auto">
        {partners.map((p, i) => (
          <div key={i} className="partner-item flex-shrink-0 flex items-center gap-3 p-3 min-w-[140px]">
            <div className="w-14 h-14 rounded bg-[#0E0E12] flex items-center justify-center text-xs font-semibold text-[var(--text-primary)]">
              {p.name.slice(0,2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-200">{p.name}</p>
              {p.subtext && <p className="text-xs text-gray-500">{p.subtext}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerStrip;
