"use client";

import { useState, useMemo } from "react";

const EconomicAnalysis = ({ fan }) => {
  const [cost, setCost] = useState(5000); // ریال/kWh
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(250);

  const annualCost = useMemo(() => {
    const totalHours = hours * days;
    const totalKwh = fan.powerConsumption * totalHours;
    return totalKwh * cost;
  }, [cost, hours, days, fan.powerConsumption]);

  return (
    <div className="bg-linear-to-br from-gray-900 via-gray-950 to-black p-6 rounded-xl shadow-lg text-white space-y-6">
      
      <h3 className="text-xl font-bold text-center drop-shadow-[0_0_6px_rgb(255,255,255)]">
        تحلیل اقتصادی سالانه
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "هزینه برق (ریال/kWh)", value: cost, setter: setCost },
          { label: "ساعات کار روزانه", value: hours, setter: setHours },
          { label: "روزهای کاری سال", value: days, setter: setDays },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="text-sm font-medium text-white/80 mb-2">{item.label}</label>
            <input
              type="number"
              value={item.value}
              onChange={e => item.setter(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>
        ))}
      </div>

      <div className="bg-black/60 border-l-4 border-blue-500 p-6 rounded-xl text-center shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all">
        <p className="text-sm text-white/70">هزینه تخمینی کارکرد سالانه:</p>
        <p className="text-3xl font-bold text-blue-400 mt-2 drop-shadow-[0_0_10px_rgb(59,130,246)]">
          {annualCost.toLocaleString("fa-IR", { maximumFractionDigits: 0 })}
          <span className="text-lg font-normal"> ریال</span>
        </p>
        <p className="text-xs text-white/50 mt-1">
          با فرض توان مصرفی {fan.powerConsumption} kW
        </p>
      </div>
    </div>
  );
};

export default EconomicAnalysis;
