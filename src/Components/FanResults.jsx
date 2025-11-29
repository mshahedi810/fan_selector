import React, { useState } from 'react';
import { FaWind, FaTachometerAlt, FaBolt, FaVolumeUp, FaExclamationCircle } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRobot, FaSyncAlt } from 'react-icons/fa';

// ======================= Fan Card =======================

const FanCard = ({ fan, onSelect, onToggleCompare, isSelectedForCompare }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl border flex flex-col hover:-translate-y-1">
    <img src={fan.imageUrl} alt={fan.model} className="w-full h-48 object-cover" />

    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-slate-800 mb-1">{fan.model}</h3>
      <p className="text-sm text-slate-500 mb-3">{fan.manufacturer} - {fan.type}</p>

      <p className="text-xs text-slate-600 mb-4 flex-grow">
        {fan.description.substring(0, 100)}...
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div className="bg-slate-100 p-2 rounded-md flex items-center gap-1">
          <FaWind className="text-blue-500" />
          <div>
            <div className="font-semibold text-slate-700">دبی هوا</div>
            <div className="text-slate-500">{fan.maxAirflow.toLocaleString('fa-IR')} m³/h</div>
          </div>
        </div>

        <div className="bg-slate-100 p-2 rounded-md flex items-center gap-1">
          <FaTachometerAlt className="text-green-500" />
          <div>
            <div className="font-semibold text-slate-700">فشار استاتیک</div>
            <div className="text-slate-500">{fan.maxStaticPressure.toLocaleString('fa-IR')} Pa</div>
          </div>
        </div>

        <div className="bg-slate-100 p-2 rounded-md flex items-center gap-1">
          <FaBolt className="text-yellow-500" />
          <div>
            <div className="font-semibold text-slate-700">قدرت مصرفی</div>
            <div className="text-slate-500">{fan.powerConsumption} kW</div>
          </div>
        </div>

        <div className="bg-slate-100 p-2 rounded-md flex items-center gap-1">
          <FaVolumeUp className="text-red-500" />
          <div>
            <div className="font-semibold text-slate-700">نویز</div>
            <div className="text-slate-500">{fan.noiseLevel} dB</div>
          </div>
        </div>
      </div>
    </div>

    <div className="px-4 pb-4 flex flex-col sm:flex-row gap-2">
      <button
        onClick={onSelect}
        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 text-sm font-semibold"
      >
        مشاهده جزئیات
      </button>

      <button
        onClick={onToggleCompare}
        className={`flex-1 py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-sm font-semibold border ${
          isSelectedForCompare
            ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200'
            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
        }`}
      >
        {isSelectedForCompare ? 'حذف از مقایسه' : 'افزودن به مقایسه'}
      </button>
    </div>
  </div>
);

// ======================= Gemini Summary =======================

const GeminiSummary = ({ fans }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getSummary = async () => {
    if (!fans || fans.length === 0) return;

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      if (!process.env.REACT_APP_GOOGLE_API_KEY) {
        setError("API Key تنظیم نشده است.");
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

      const fanDataString = fans.map(f =>
        `Model: ${f.model}, Type: ${f.type}, Airflow: ${f.maxAirflow} m3/h, Pressure: ${f.maxStaticPressure} Pa, Power: ${f.powerConsumption} kW, Noise: ${f.noiseLevel} dB`
      ).join('\n');

      const prompt = `As an expert HVAC engineer, provide a brief Persian summary for the following industrial fans. Highlight key strengths and ideal applications for each model.

Fan Data:
${fanDataString}`;

      const result = await model.generateContent({
        contents: prompt
      });

      const text = result.output_text || result.contents?.[0]?.text || "خطا: پاسخی دریافت نشد";
      setSummary(text);

    } catch (e) {
      console.error(e);
      setError("خطا در تولید خلاصه رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
  {/* هدر با آیکون */}
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-3">
      <FaRobot className="text-blue-700 w-6 h-6" />
      <h3 className="font-extrabold text-blue-800 text-lg sm:text-xl">خلاصه هوشمند</h3>
    </div>
    
    <button
      onClick={getSummary}
      disabled={isLoading || fans.length === 0}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform disabled:bg-slate-400 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <FaSyncAlt className="animate-spin" /> در حال پردازش...
        </>
      ) : (
        'تولید خلاصه'
      )}
    </button>
  </div>

  {/* خطای تحلیل */}
  {error && (
    <p className="flex items-center gap-2 text-red-600 font-medium mb-3">
      <FaRobot /> {error}
    </p>
  )}

  {/* متن خلاصه */}
  {summary && (
    <div className="mt-2 p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-inner border border-blue-100 text-slate-800 text-sm sm:text-base whitespace-pre-wrap">
      {summary}
    </div>
  )}
</div>
  );
};

// ======================= Main Component =======================

const FanResults = ({ fans, onSelectFan, onToggleCompare, compareList, onShowComparison }) => {
  return (
    <div>
      {/* بخش باکس مقایسه */}
      {compareList.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 sticky top-8 z-10 flex justify-between items-center">
          <div className="flex-grow">
            <span className="font-bold">{compareList.length}</span> محصول برای مقایسه انتخاب شده:
            <span className="text-sm text-slate-600 mr-2">
              {compareList.map((f) => f.model).join('، ')}
            </span>
          </div>

          <button
            onClick={onShowComparison}
            disabled={compareList.length < 2}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            مقایسه کن ({compareList.length}/4)
          </button>
        </div>
      )}

      {/* خلاصه هوشمند */}
      {fans.length > 0 && <GeminiSummary fans={fans} />}

      {/* لیست کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {fans.map((fan) => (
          <FanCard
            key={fan.id}
            fan={fan}
            onSelect={() => onSelectFan(fan)}
            onToggleCompare={() => onToggleCompare(fan)}
            isSelectedForCompare={compareList.some((f) => f.id === fan.id)}
          />
        ))}
      </div>

      {/* بدون نتیجه */}
      {fans.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-md flex flex-col items-center gap-3">
          <FaExclamationCircle className="text-red-400 w-12 h-12" />
          <h3 className="mt-2 text-sm font-medium text-slate-900">نتیجه‌ای یافت نشد</h3>
          <p className="mt-1 text-sm text-slate-500">
            لطفاً پارامترهای فنی پروژه را تغییر دهید و مجدداً تلاش کنید.
          </p>
        </div>
      )}
    </div>
  );
};

export default FanResults;
