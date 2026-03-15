"use client";

import { useState, useEffect, useRef } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const hasShown = useRef(false);

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

    setStatus("loading");
    setErrorMsg("");

    try {
      // Detect city from current page URL
      const path = window.location.pathname;
      const citySlug = path.length > 1 ? path.slice(1) : "";
      const cityName = citySlug
        ? citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Your city";

      const res = await fetch("/api/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city: cityName,
          forecastType: "tomorrow",
          sendHour: 20,
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
                className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-white/20 text-sm font-medium"
                disabled={status === "loading"}
                autoFocus
              />

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
