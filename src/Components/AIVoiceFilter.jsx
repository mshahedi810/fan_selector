import React, { useState, useRef, useEffect } from 'react';

const AIVoiceFilter = ({ onFiltersUpdate }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('تشخیص گفتار توسط مرورگر شما پشتیبانی نمی‌شود.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setAnalysis('');
      setError('');
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interim += event.results[i][0].transcript;
      }
      setTranscript(interim);
    };

    recognition.onerror = (event) => {
      setError(`خطای گفتار: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  useEffect(() => {
    if (!isListening && transcript.trim()) {
      analyzeTranscript(transcript);
    }
  }, [isListening, transcript]);

  const handleListen = () => {
    if (isListening) recognitionRef.current?.stop();
    else recognitionRef.current?.start();
  };

  const analyzeTranscript = async (text) => {
    setIsLoading(true);
    setError('');
    setAnalysis('');

    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // ← درست استفاده کن
    if (!API_KEY) {
      setError("API Key تنظیم نشده است.");
      setIsLoading(false);
      return;
    }

    try {
      const ai = new google.generativeAI.GoogleGenerativeAI(API_KEY);

      const prompt = `
        به عنوان یک کارشناس تأسیسات تهویه، متن زیر را تحلیل کن و ۳ مقدار زیر را استخراج کن:
        airflow (m3/h)
        staticPressure (Pa)
        temperature (°C)

        متن کاربر:
        "${text}"

        نتیجه را فقط در قالب JSON بده:
        {
          "airflow": number,
          "staticPressure": number,
          "temperature": number
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", text: prompt }],
      });

      const raw = await response.response.text();
      const parsed = JSON.parse(raw);

      onFiltersUpdate({
        airflow: parsed.airflow || 15000,
        staticPressure: parsed.staticPressure || 400,
        temperature: parsed.temperature || 25,
      });

      setAnalysis(
        `تحلیل انجام شد: دبی ${parsed.airflow} m³/h، فشار ${parsed.staticPressure} Pa، دما ${parsed.temperature}°C.`
      );

    } catch (e) {
      console.error(e);
      setError("خطا در تحلیل اطلاعات صوتی.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
   <div className="flex flex-col justify-center bg-gradient-to-br from-blue-200 to-blue-50 p-6 rounded-2xl shadow-lg no-print transition-all duration-300 hover:shadow-2xl">
  
  {/* تیتر */}
  <h2 className="relative text-lg font-extrabold mb-4 px-4 py-2 rounded-xl text-white
    bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg inline-block
    before:absolute before:inset-0 before:bg-white/20 before:rounded-xl before:-z-10
    transform transition-all text-center duration-300 hover:scale-105 hover:shadow-2xl">
    فیلتر هوشمند صوتی
  </h2>

  <div className="flex flex-col items-center gap-5 mt-2">

    {/* دکمه میکروفون با امواج */}
    <div className="relative flex items-center justify-center">
      {/* حلقه امواج وقتی در حال شنیدن است */}
      {isListening && (
        <>
          <span className="absolute w-28 h-28 rounded-full bg-red-400/30 animate-ping"></span>
          <span className="absolute w-36 h-36 rounded-full bg-red-400/20 animate-ping delay-150"></span>
        </>
      )}

      <button
        onClick={handleListen}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center text-3xl text-white shadow-lg transition-transform duration-200 transform hover:scale-110 ${
          isListening ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        }`}
      >
        {isListening ? "🎤" : "🎧"}
      </button>
    </div>

    {/* توضیح */}
    <p className="text-sm text-slate-700 text-center font-semibold">
      {isListening ? "در حال شنیدن..." : "برای شروع روی میکروفون کلیک کنید"}
    </p>

    {/* باکس transcript / تحلیل */}
    {(transcript || isLoading || analysis || error) && (
      <div className="w-full mt-3 p-4 bg-white rounded-2xl text-sm border border-slate-200 shadow-inner min-h-[80px] transition-all duration-300">
        {isLoading && <p className="text-blue-600 animate-pulse font-semibold">در حال تحلیل...</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {analysis && <p className="text-green-700 font-semibold">{analysis}</p>}
        {!isLoading && !analysis && transcript && (
          <p className="text-slate-700">شما گفتید: "{transcript}"</p>
        )}
      </div>
    )}
  </div>
</div>


=======
    <div className="bg-white p-6 rounded-lg shadow-md no-print">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">فیلتر هوشمند صوتی</h2>

      <div className="flex flex-col items-center gap-4">

        <button
          onClick={handleListen}
          className={`w-20 h-20 rounded-full text-white flex items-center justify-center transition-colors ${
            isListening ? "bg-red-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isListening ? "🎤" : "🎧"}
        </button>

        <p className="text-xs text-slate-500">
          {isListening ? "در حال شنیدن..." : "برای شروع کلیک کنید"}
        </p>

        {(transcript || isLoading || analysis || error) && (
          <div className="w-full mt-2 p-3 bg-slate-50 rounded-md text-sm border min-h-[60px]">
            {isLoading && <p className="text-blue-600 animate-pulse">در حال تحلیل...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {analysis && <p className="text-green-700 font-semibold">{analysis}</p>}
            {!isLoading && !analysis && transcript && (
              <p className="text-slate-500">شما گفتید: "{transcript}"</p>
            )}
          </div>
        )}
      </div>
    </div>
>>>>>>> f0f6deb2997b72238193b2a3b6b3878acb917d0b
  );
};

export default AIVoiceFilter;