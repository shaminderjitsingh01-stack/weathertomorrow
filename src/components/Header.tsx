import Link from "next/link";

export default function Header({
  subtitle,
  isLanding = false,
}: {
  subtitle?: string;
  isLanding?: boolean;
}) {
  const Logo = () => (
    <div className="flex items-center justify-center gap-2.5">
      {/* Weather icon logo */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="11" cy="11" r="5" fill="#FBBF24" opacity="0.9" />
        <path
          d="M8 19c0-4.418 3.582-8 8-8 2.761 0 5.193 1.399 6.633 3.527A5.5 5.5 0 0124 14.5 5.5 5.5 0 0124 25H8v-6z"
          fill="white"
          opacity="0.85"
        />
      </svg>
      <span
        className={`font-extrabold tracking-tight ${isLanding ? "text-3xl sm:text-4xl" : "text-xl"}`}
      >
        Weather Tomorrow
      </span>
    </div>
  );

  return (
    <header className={`text-center ${isLanding ? "mb-10 pt-16 pb-2" : "mb-6 pt-4"}`}>
      {isLanding ? (
        <>
          <Logo />
          <p className="text-white/50 text-base mt-3 font-medium">
            Tomorrow&apos;s forecast, instantly
          </p>
        </>
      ) : (
        <>
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          {subtitle && (
            <p className="text-white/40 text-sm mt-1.5 font-medium">{subtitle}</p>
          )}
        </>
      )}
    </header>
  );
}
