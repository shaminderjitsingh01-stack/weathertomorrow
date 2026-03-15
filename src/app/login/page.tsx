"use client";

import { useState, useEffect, useRef } from "react";

interface CityResult {
  name: string;
  country: string;
  admin1?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [forecastType, setForecastType] = useState<"today" | "tomorrow">("tomorrow");
  const [sendHour, setSendHour] = useState(20);
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const cityRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // City autocomplete
  useEffect(() => {
    if (city.length < 2) {
      setCityResults([]);
      setShowCityDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(city)}`);
        if (res.ok) {
          const data = await res.json();
          setCityResults(data.slice(0, 6));
          setShowCityDropdown(data.length > 0);
        }
      } catch {
        // silently fail
      }
    }, 300);
  }, [city]);

  function selectCity(result: CityResult) {
    setCity(result.name);
    setShowCityDropdown(false);
    setCityResults([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }

    if (!city.trim()) {
      setErrorMsg("Please enter your city.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city: city.trim(),
          forecastType,
          sendHour,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
      } else {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-md mx-auto px-4 py-4">
        <header className="text-center pt-10 sm:pt-16 mb-8 sm:mb-10">
          <a href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="22" cy="10" r="7" fill="#FBBF24" opacity="0.85" />
              <circle cx="22" cy="10" r="5" fill="#FDE68A" opacity="0.5" />
              <ellipse cx="15" cy="22" rx="11" ry="6.5" fill="white" opacity="0.9" />
              <ellipse cx="10" cy="19" rx="7" ry="6" fill="white" opacity="0.85" />
              <ellipse cx="20" cy="18.5" rx="6" ry="5" fill="white" opacity="0.8" />
              <ellipse cx="14" cy="16.5" rx="5.5" ry="4.5" fill="white" opacity="0.95" />
            </svg>
            <span className="text-xl font-extrabold tracking-tight">Weather Tomorrow</span>
          </a>
        </header>

        {status === "sent" ? (
          <div className="card-elevated rounded-3xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12.5" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                <path d="M16 19l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold mb-2">Check your email</h1>
            <p className="text-sm text-white/50 mb-1">
              We sent a link to
            </p>
            <p className="text-sm font-semibold text-white/80 mb-4">{email}</p>
            <p className="text-xs text-white/30">
              Click the link to manage your {city} weather subscription. Check spam if you don&apos;t see it.
            </p>
          </div>
        ) : (
          <div className="card-elevated rounded-3xl p-5 sm:p-8">
            <h1 className="text-lg sm:text-xl font-bold text-center mb-2">Get your daily forecast</h1>
            <p className="text-sm text-white/40 text-center mb-6">
              Enter your email and city to subscribe or manage your existing subscription.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full search-input rounded-xl px-4 py-3.5 text-white placeholder-white/25 focus:outline-none text-sm font-medium"
                  disabled={status === "loading"}
                  autoFocus
                />
              </div>

              <div ref={cityRef} className="relative">
                <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Singapore, London, New York"
                  className="w-full search-input rounded-xl px-4 py-3.5 text-white placeholder-white/25 focus:outline-none text-sm font-medium"
                  disabled={status === "loading"}
                  autoComplete="off"
                />

                {showCityDropdown && cityResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-2xl rounded-xl overflow-hidden z-50 max-h-[40vh] overflow-y-auto">
                    {cityResults.map((result, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectCity(result)}
                        className="w-full px-4 py-3 text-left hover:bg-white/12 transition-colors flex items-center justify-between border-b border-white/8 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm font-medium">{result.name}</span>
                        </div>
                        <span className="text-xs text-white/30">
                          {result.admin1 ? `${result.admin1}, ` : ""}{result.country}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Forecast type */}
              <div>
                <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
                  I want to receive
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => { setForecastType("today"); if (sendHour >= 12) setSendHour(6); }}
                    className={`flex-1 py-2.5 rounded-l-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
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
                    className={`flex-1 py-2.5 rounded-r-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
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
                    ? "Morning delivery — plan your day before heading out"
                    : "Evening delivery — plan ahead for tomorrow"}
                </p>
              </div>

              {/* Send time */}
              <div>
                <label className="block text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-2">
                  Deliver at
                </label>
                <select
                  value={sendHour}
                  onChange={(e) => setSendHour(Number(e.target.value))}
                  className="w-full search-input rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none bg-transparent appearance-none cursor-pointer"
                  disabled={status === "loading"}
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const label = i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
                    return (
                      <option key={i} value={i} className="bg-slate-900">{label}</option>
                    );
                  })}
                </select>
                <p className="text-[10px] text-white/20 mt-1.5">
                  Your local time ({typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ") : ""})
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl py-3.5 text-sm font-bold transition-colors cursor-pointer"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>

              {status === "error" && (
                <p className="text-xs text-rose-400 text-center">{errorMsg}</p>
              )}
            </form>

            <p className="text-[10px] text-white/20 text-center mt-4">
              New here? You&apos;ll be subscribed automatically. Already subscribed? We&apos;ll send you a link to manage your preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
