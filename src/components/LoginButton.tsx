import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="fixed top-3 right-4 z-50">
      <Link
        href="/login"
        className="card-interactive rounded-lg px-3.5 py-2 text-[11px] font-bold text-white/50 hover:text-white/80 flex items-center gap-1.5 uppercase tracking-wider"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Login
      </Link>
    </div>
  );
}
