"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIVoiceFilter = ({ webhookUrl, onAiResponse }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef(null);

  // -------- Init SpeechRecognition --------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fa-IR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setAnalysis("");
      setError("");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
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

const sendToN8N = async (text) => {
  if (!webhookUrl || !text.trim()) return;

  setIsLoading(true);
  setError("");
  setAnalysis("");

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language: "fa" }),
    });

    if (!res.ok) throw new Error("خطا در پاسخ n8n");

    const data = await res.json();
    console.log("RAW RESPONSE >>>", data);

    
    if (Array.isArray(data) && data.length > 0 && data[0].output) {
      setAnalysis(JSON.parse(data[0].output));
      onAiResponse?.(JSON.parse(data[0].output));
    } else {
      setError("پاسخی دریافت نشد");
      console.log("Unexpected data structure:", data);
    }

  } catch (err) {
    console.error("Error sending to n8n:", err);
    setError("خطا در ارتباط با هوش مصنوعی");
  } finally {
    setIsLoading(false);
  }
};




  // -------- بعد از پایان گفتار --------
  useEffect(() => {
    if (!isListening && transcript.trim()) {
      sendToN8N(transcript);
    }
  }, [isListening, transcript]);

  // -------- UI --------
  const handleListen = () => {
    if (!isSupported) return;
    if (isListening) recognitionRef.current?.stop();
    else recognitionRef.current?.start();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center gap-6">
      <h2 className="text-2xl font-extrabold text-white">
        فیلتر صوتی هوشمند
      </h2>

      {!isSupported && (
        <div className="p-3 bg-red-500/20 rounded-xl text-red-100 text-sm text-center">
          مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند
        </div>
      )}

      <div className="relative">
        <AnimatePresence>
          {isListening && (
            <>
              <motion.span
                className="absolute w-40 h-40 rounded-full border border-pink-500/50"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <motion.span
                className="absolute w-56 h-56 rounded-full border border-purple-400/40"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </>
          )}
        </AnimatePresence>

        <button
          onClick={handleListen}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-4xl text-white shadow-lg transition-transform ${
            isListening ? "bg-pink-500 scale-110" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          🎤
        </button>
      </div>

      <p className="text-white/80 text-sm">
        {isListening ? "در حال گوش دادن..." : "برای صحبت کلیک کنید"}
      </p>

      {(isLoading || transcript || analysis || error) && (
        <div className="w-full space-y-3">
          {isLoading && (
            <motion.div
              className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full"
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          )}

          {transcript && !analysis && !error && (
            <div className="p-3 bg-white/20 rounded-xl text-white text-sm">
              <strong>شما گفتید:</strong> {transcript}
            </div>
          )}

          {analysis && (
            <pre className="p-3 bg-green-500/20 rounded-xl text-green-100 text-sm font-semibold whitespace-pre-wrap">
              {analysis}
            </pre>
          )}

          {error && (
            <div className="p-3 bg-red-500/20 rounded-xl text-red-100 text-sm font-semibold">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIVoiceFilter;
