"use client";

import { useState } from "react";

interface PreferencesFormProps {
  email: string;
  token: string;
  initialCity: string;
  initialTimezone: string;
  initialSendHour: number;
  initialForecastType: "today" | "tomorrow";
}

export default function PreferencesForm({
  email,
  token,
  initialCity,
  initialTimezone,
  initialSendHour,
  initialForecastType,
}: PreferencesFormProps) {
  const [city, setCity] = useState(initialCity);
  const [sendHour, setSendHour] = useState(initialSendHour);
  const [forecastType, setForecastType] = useState<"today" | "tomorrow">(initialForecastType);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-detect timezone from browser
  const detectedTimezone = typeof window !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : initialTimezone;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!city.trim()) {
      setErrorMsg("City is required.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setErrorMsg("");

    try {
      const res = await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          city: city.trim(),
          timezone: detectedTimezone,
          sendHour,
          forecastType,
        }),
      });

      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to save. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const label =
      i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
    return { value: i, label };
  });

  return (
    <div className="max-w-md mx-auto">
      <div className="card-elevated rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold">My Subscription</h1>
            <p className="text-xs text-white/35">{email}</p>
          </div>
        </div>

        {/* Current subscription summary */}
        <div className="mt-4 bg-white/5 rounded-xl p-4 space-y-2">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">Current Subscription</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="text-white/50">City: <span className="text-white/80 font-semibold">{initialCity || "Not set"}</span></span>
            <span className="text-white/50">Type: <span className="text-white/80 font-semibold">{initialForecastType === "today" ? "Today's forecast" : "Tomorrow's forecast"}</span></span>
            <span className="text-white/50">Time: <span className="text-white/80 font-semibold">{initialSendHour === 0 ? "12 AM" : initialSendHour < 12 ? `${initialSendHour} AM` : initialSendHour === 12 ? "12 PM" : `${initialSendHour - 12} PM`}</span></span>
          </div>
        </div>

        <div className="divider my-5" />

        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-3">Update Preferences</p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* City */}
          <div>
            <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Singapore, London, New York"
              className="w-full search-input rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none text-sm font-medium"
              disabled={status === "saving"}
            />
            <p className="text-[10px] text-white/20 mt-1.5">
              The city you want weather forecasts for
            </p>
          </div>

          {/* Forecast type toggle */}
          <div>
            <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
              What do you want to receive?
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => { setForecastType("today"); if (sendHour >= 12) setSendHour(6); }}
                className={`flex-1 py-2.5 rounded-l-xl text-sm font-bold transition-all cursor-pointer ${
                  forecastType === "today"
                    ? "bg-white/12 text-white"
                    : "bg-white/4 text-white/30 hover:text-white/50"
                }`}
              >
                Today&apos;s weather
              </button>
              <button
                type="button"
                onClick={() => { setForecastType("tomorrow"); if (sendHour < 12) setSendHour(20); }}
                className={`flex-1 py-2.5 rounded-r-xl text-sm font-bold transition-all cursor-pointer ${
                  forecastType === "tomorrow"
                    ? "bg-white/12 text-white"
                    : "bg-white/4 text-white/30 hover:text-white/50"
                }`}
              >
                Tomorrow&apos;s weather
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-1.5">
              {forecastType === "today"
                ? "Get today's forecast in the morning before you head out"
                : "Get tomorrow's forecast in the evening so you can plan ahead"}
            </p>
          </div>

          {/* Send hour */}
          <div>
            <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
              Delivery Time
            </label>
            <select
              value={sendHour}
              onChange={(e) => setSendHour(Number(e.target.value))}
              className="w-full search-input rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none bg-transparent appearance-none cursor-pointer"
              disabled={status === "saving"}
            >
              {hourOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={status === "saving"}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl py-3 text-sm font-bold transition-colors cursor-pointer"
          >
            {status === "saving" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : status === "saved" ? (
              <span className="flex items-center justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Saved!
              </span>
            ) : (
              "Save Preferences"
            )}
          </button>

          {status === "error" && (
            <p className="text-xs text-rose-400 text-center">{errorMsg}</p>
          )}
        </form>

        <div className="divider my-5" />

        <a href="/" className="block text-center text-xs text-white/30 hover:text-white/50 transition-colors">
          Back to Weather Tomorrow
        </a>
      </div>
    </div>
  );
}
