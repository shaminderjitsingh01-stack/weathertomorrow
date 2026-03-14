"use client";

import { useState } from "react";

export default function SubscribeForm({
  cityName,
  timezone,
}: {
  cityName: string;
  timezone: string;
}) {
  const [email, setEmail] = useState("");
  const [sendHour, setSendHour] = useState(20); // default 8pm
  const [forecastType, setForecastType] = useState<"tomorrow" | "today">("tomorrow");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city: cityName,
          timezone,
          sendHour,
          forecastType,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="font-bold text-sm">You&apos;re subscribed!</span>
        </div>
        <p className="text-xs text-white/40">
          You&apos;ll get {cityName}&apos;s forecast at{" "}
          {sendHour === 0 ? "12 AM" : sendHour <= 12 ? `${sendHour} AM` : `${sendHour - 12} PM`}{" "}
          daily.
        </p>
      </div>
    );
  }

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const label =
      i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
    return { value: i, label };
  });

  return (
    <div className="card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
          <path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="section-label">Daily Forecast Email</span>
      </div>
      <p className="text-[12px] text-white/35 mb-4">
        Get {cityName}&apos;s weather delivered to your inbox daily.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full search-input rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none text-sm font-medium"
          disabled={status === "loading"}
        />

        {/* Forecast type toggle */}
        <div className="flex items-center gap-3">
          <label className="text-[11px] text-white/30 font-semibold whitespace-nowrap">
            Forecast
          </label>
          <div className="flex gap-1 flex-1">
            <button
              type="button"
              onClick={() => { setForecastType("today"); setSendHour(6); }}
              className={`flex-1 py-2 rounded-l-lg text-xs font-bold transition-all cursor-pointer ${
                forecastType === "today"
                  ? "bg-white/12 text-white"
                  : "bg-white/4 text-white/30"
              }`}
            >
              Today&apos;s weather
            </button>
            <button
              type="button"
              onClick={() => { setForecastType("tomorrow"); setSendHour(20); }}
              className={`flex-1 py-2 rounded-r-lg text-xs font-bold transition-all cursor-pointer ${
                forecastType === "tomorrow"
                  ? "bg-white/12 text-white"
                  : "bg-white/4 text-white/30"
              }`}
            >
              Tomorrow&apos;s weather
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-[11px] text-white/30 font-semibold whitespace-nowrap">
            Send at
          </label>
          <select
            value={sendHour}
            onChange={(e) => setSendHour(Number(e.target.value))}
            className="flex-1 search-input rounded-lg px-3 py-2 text-white text-xs font-medium focus:outline-none bg-transparent appearance-none cursor-pointer"
            disabled={status === "loading"}
          >
            {hourOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl py-3 text-sm font-bold transition-colors cursor-pointer"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Subscribing...
            </span>
          ) : (
            "Subscribe — Free"
          )}
        </button>

        {status === "error" && (
          <p className="text-xs text-rose-400 text-center">{errorMsg}</p>
        )}

        <p className="text-[10px] text-white/20 text-center">
          Unsubscribe anytime. No spam.
        </p>
      </form>
    </div>
  );
}
