import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 pb-8 space-y-4">
      <div className="divider" />
      <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs text-white/20 font-medium">
        <Link href="/about" className="hover:text-white/40 transition-colors">
          About
        </Link>
        <Link href="/privacy" className="hover:text-white/40 transition-colors">
          Privacy
        </Link>
      </div>
      <p className="text-xs text-white/15 text-center">
        &copy; {new Date().getFullYear()} weathertomorrow.app &middot; Forecast data by Open-Meteo
      </p>
    </footer>
  );
}
