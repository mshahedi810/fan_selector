"use client";

import React, { useEffect } from "react";
import FanCard from "./FanCard";

const FanResults = ({
  fans,
  onSelectFan,
  onToggleCompare,
  compareList,
  onShowComparison,
}) => {

  // -------- فقط وقتی fans تغییر کرد log بزن --------
  useEffect(() => {
    console.log("Fans updated:", fans);
  }, [fans]);

  return (
    <div className="space-y-6">
      {/* Banner مقایسه */}
      {compareList.length > 0 && (
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-lg sticky top-8 z-20 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-medium">
            <span className="font-bold">{compareList.length}</span> محصول برای مقایسه انتخاب شده:
            {compareList.map((f) => (
              <span key={f._id} className="bg-white/20 px-2 py-1 rounded text-sm">{f.model}</span>
            ))}
          </div>
          <button
            onClick={onShowComparison}
            disabled={compareList.length < 2}
            className="bg-white text-green-700 font-semibold py-2 px-5 rounded-lg hover:bg-white/90 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-md mt-2 md:mt-0"
          >
            مقایسه کن ({compareList.length}/4)
          </button>
        </div>
      )}

      {/* لیست فن‌ها */}
      {fans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 md:p-4">
          {fans.map((fan) => (
            <FanCard
              key={fan._id}
              fan={fan}
              onSelect={() => onSelectFan(fan)}
              onToggleCompare={() => onToggleCompare(fan)}
              isSelectedForCompare={compareList.some(f => f._id === fan._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-slate-200">
          <h3 className="mt-4 text-lg font-semibold text-slate-900">نتیجه‌ای یافت نشد</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            لطفاً پارامترهای فنی پروژه را تغییر دهید و مجدداً تلاش کنید.
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------- React.memo برای جلوگیری از render های اضافه ---------- */
export default React.memo(FanResults, (prevProps, nextProps) => {
  // فقط وقتی آرایه fans یا compareList تغییر کرده دوباره render بشه
  return (
    prevProps.fans === nextProps.fans &&
    prevProps.compareList === nextProps.compareList
  );
});
