import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="fixed top-0 right-0 z-50 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-[11px] font-bold flex items-center gap-1.5 uppercase tracking-wider transition-colors rounded-bl-lg"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      Login
    </Link>
  );
}
