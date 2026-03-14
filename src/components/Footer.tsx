import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 pb-8 text-center space-y-3">
      <div className="flex flex-wrap justify-center gap-4 text-xs text-white/30">
        <Link href="/about" className="hover:text-white/60 transition-colors">
          About
        </Link>
        <Link href="/privacy" className="hover:text-white/60 transition-colors">
          Privacy
        </Link>
        <span>Weather data by Open-Meteo</span>
      </div>
      <p className="text-xs text-white/20">
        &copy; {new Date().getFullYear()} weathertomorrow.app
      </p>
    </footer>
  );
}
