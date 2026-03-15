"use client";

import { useState, useEffect, useRef } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [forecastType, setForecastType] = useState<"today" | "tomorrow">("tomorrow");
  const [sendHour, setSendHour] = useState(20);
  const [cityResults, setCityResults] = useState<{ name: string; country: string; admin1?: string }[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const cityRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const hasShown = useRef(false);

  // City autocomplete
  useEffect(() => {
    if (city.length < 2) { setCityResults([]); setShowCityDropdown(false); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(city)}`);
        if (res.ok) {
          const data = await res.json();
          setCityResults(data.slice(0, 5));
          setShowCityDropdown(data.length > 0);
        }
      } catch { /* silent */ }
    }, 300);
  }, [city]);

  // Close city dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setShowCityDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-detect city from URL
  useEffect(() => {
    if (show && !city) {
      const path = window.location.pathname;
      if (path.length > 1) {
        const slug = path.slice(1);
        const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        setCity(name);
      }
    }
  }, [show, city]);

  useEffect(() => {
    // Don't show if already subscribed or dismissed this session
    if (sessionStorage.getItem("exit-popup-dismissed")) return;
    // Don't show if already shown
    if (hasShown.current) return;

    // Desktop: mouse leaves viewport (moves toward browser chrome/tabs)
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !hasShown.current) {
        hasShown.current = true;
        setShow(true);
      }
    }

    // Mobile: scroll up rapidly (back toward top = likely leaving)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;

    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY < lastScrollY && currentY > 200) {
        scrollUpCount++;
        if (scrollUpCount > 8 && !hasShown.current) {
          hasShown.current = true;
          setShow(true);
        }
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentY;
    }

    // Delay adding listeners — don't trigger on initial page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "1");
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

      if (res.ok) {
        setStatus("success");
        sessionStorage.setItem("exit-popup-dismissed", "1");
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

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Popup */}
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors cursor-pointer z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Gradient header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 pt-8 pb-6 text-center">
          <div className="text-4xl mb-3">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" className="mx-auto">
              <circle cx="22" cy="10" r="7" fill="#FBBF24" opacity="0.85" />
              <circle cx="22" cy="10" r="5" fill="#FDE68A" opacity="0.5" />
              <ellipse cx="15" cy="22" rx="11" ry="6.5" fill="white" opacity="0.9" />
              <ellipse cx="10" cy="19" rx="7" ry="6" fill="white" opacity="0.85" />
              <ellipse cx="20" cy="18.5" rx="6" ry="5" fill="white" opacity="0.8" />
              <ellipse cx="14" cy="16.5" rx="5.5" ry="4.5" fill="white" opacity="0.95" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mb-1">
            Before you go!
          </h2>
          <p className="text-sm text-white/70">
            Get tomorrow&apos;s forecast delivered to your inbox — free, every evening.
          </p>
        </div>

        <div className="px-6 py-5">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="font-bold mb-1">You&apos;re in!</p>
              <p className="text-xs text-white/40">Check your email for a confirmation link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-white/20 text-sm font-medium"
                disabled={status === "loading"}
                autoFocus
              />

              {/* City with autocomplete */}
              <div ref={cityRef} className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City — e.g. Singapore"
                  className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-white/20 text-sm font-medium"
                  disabled={status === "loading"}
                  autoComplete="off"
                />
                {showCityDropdown && cityResults.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-slate-800 border border-white/15 rounded-xl overflow-hidden z-50 max-h-[30vh] overflow-y-auto">
                    {cityResults.map((r, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setCity(r.name); setShowCityDropdown(false); }}
                        className="w-full px-4 py-2.5 text-left hover:bg-white/10 transition-colors flex items-center justify-between border-b border-white/5 last:border-0 text-sm"
                      >
                        <span className="font-medium">{r.name}</span>
                        <span className="text-[10px] text-white/30">{r.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Forecast type */}
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => { setForecastType("today"); if (sendHour >= 12) setSendHour(6); }}
                  className={`flex-1 py-2 rounded-l-xl text-[11px] font-bold transition-all cursor-pointer ${
                    forecastType === "today" ? "bg-white/12 text-white" : "bg-white/4 text-white/30"
                  }`}
                >
                  Today&apos;s weather
                </button>
                <button
                  type="button"
                  onClick={() => { setForecastType("tomorrow"); if (sendHour < 12) setSendHour(20); }}
                  className={`flex-1 py-2 rounded-r-xl text-[11px] font-bold transition-all cursor-pointer ${
                    forecastType === "tomorrow" ? "bg-white/12 text-white" : "bg-white/4 text-white/30"
                  }`}
                >
                  Tomorrow&apos;s weather
                </button>
              </div>

              {/* Time */}
              <select
                value={sendHour}
                onChange={(e) => setSendHour(Number(e.target.value))}
                className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-medium focus:outline-none appearance-none cursor-pointer"
                disabled={status === "loading"}
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const label = i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
                  return <option key={i} value={i} className="bg-slate-900">{label}</option>;
                })}
              </select>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl py-3 text-sm font-bold transition-colors cursor-pointer"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </span>
                ) : (
                  "Subscribe — It's Free"
                )}
              </button>

              {status === "error" && (
                <p className="text-xs text-rose-400 text-center">{errorMsg}</p>
              )}

              <p className="text-[10px] text-white/20 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
