"use client";
import React, { useState } from "react";

const N8NComparisonSummary = ({ fans, webhookUrl }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getSummary = async () => {
    setIsLoading(true);
    setError("");
    setSummary("");

    if (!webhookUrl) {
      setError("Webhook n8n مشخص نشده است.");
      setIsLoading(false);
      return;
    }

    try {
      // داده‌ها را آماده می‌کنیم
      const fanData = fans.map(f => ({
        model: f.model,
        type: f.type,
        airflow: f.maxAirflow,
        pressure: f.maxStaticPressure,
        power: f.powerConsumption,
        noise: f.noiseLevel,
        price: f.price,
      }));

      // POST به Webhook n8n
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fans: fanData }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "خطا در پردازش Webhook");

      // فرض می‌کنیم n8n پاسخ را به شکل { summary: "..." } برمی‌گرداند
      setSummary(data.summary || "پاسخ خالی بود.");
    } catch (e) {
      console.error(e);
      setError("خطا در اتصال به n8n.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black/40 border border-white/20 rounded-lg p-4 my-6 text-white/90">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-white/80 drop-shadow-[0_0_6px_rgb(255,255,255)]">تحلیل مقایسه‌ای هوشمند</h3>
        <button
          onClick={getSummary}
          disabled={isLoading || fans.length < 2}
          className="bg-blue-600 text-white text-xs py-1 px-3 rounded-md hover:bg-blue-700 disabled:bg-white/20 transition-all"
        >
          {isLoading ? "در حال پردازش..." : "تولید تحلیل"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {summary && <div className="mt-4 text-sm text-white/80 whitespace-pre-wrap prose prose-sm max-w-none">{summary}</div>}
    </div>
  );
};

export default N8NComparisonSummary;
