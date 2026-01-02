// AITextInput.jsx
"use client";

import { useState } from "react";

const AITextInput = ({ webhookUrl, onAiResponse }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendText = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "text",
          message: text,
        }),
      });

      const data = await res.json();

      // بسته به خروجی n8n
      const aiText =
        data?.output ||
        data?.response ||
        JSON.stringify(data, null, 2);

      onAiResponse?.(aiText);
      setText("");
    } catch (err) {
      console.error(err);
      onAiResponse?.("❌ خطا در ارتباط با AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="سؤال یا توضیح خود را بنویسید..."
        className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendText}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-2 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "ارسال به AI"}
      </button>
    </div>
  );
};

export default AITextInput;
