import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="fixed top-0 right-0 z-50 bg-white/10 hover:bg-white/18 text-white/60 hover:text-white px-4 py-2 text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wider transition-colors rounded-bl-lg backdrop-blur-sm"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12.5" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
      Free Daily Forecast
    </Link>
  );
}
