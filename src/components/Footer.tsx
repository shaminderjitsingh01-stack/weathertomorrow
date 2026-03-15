import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 pb-8 space-y-4">
      <div className="divider" />
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-3 text-[11px] font-semibold text-white/20 uppercase tracking-wider">
        <Link href="/about" className="hover:text-white/40 transition-colors">
          About
        </Link>
        <Link href="/privacy" className="hover:text-white/40 transition-colors">
          Privacy
        </Link>
        <Link href="/login" className="hover:text-white/40 transition-colors">
          Free Daily Forecast
        </Link>
      </div>
      <p className="text-[10px] text-white/10 text-center">
        &copy; {new Date().getFullYear()} weathertomorrow.app &middot; Powered by Open-Meteo
      </p>
    </footer>
  );
}
