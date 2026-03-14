import Link from "next/link";

function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Sun behind cloud */}
      <circle cx="22" cy="10" r="7" fill="#FBBF24" opacity="0.85" />
      <circle cx="22" cy="10" r="5" fill="#FDE68A" opacity="0.5" />
      {/* Cloud */}
      <ellipse cx="15" cy="22" rx="11" ry="6.5" fill="white" opacity="0.9" />
      <ellipse cx="10" cy="19" rx="7" ry="6" fill="white" opacity="0.85" />
      <ellipse cx="20" cy="18.5" rx="6" ry="5" fill="white" opacity="0.8" />
      <ellipse cx="14" cy="16.5" rx="5.5" ry="4.5" fill="white" opacity="0.95" />
    </svg>
  );
}

export default function Header({
  subtitle,
  isLanding = false,
  lastUpdated,
}: {
  subtitle?: string;
  isLanding?: boolean;
  lastUpdated?: string;
}) {
  return (
    <header className={`text-center ${isLanding ? "pt-20 pb-4 mb-8" : "pt-5 mb-5"}`}>
      {isLanding ? (
        <>
          <div className="flex items-center justify-center gap-3 mb-4">
            <LogoIcon size={36} />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Weather Tomorrow
            </h1>
          </div>
          <p className="text-white/40 text-base font-medium">
            Tomorrow&apos;s forecast for any city — instantly
          </p>
        </>
      ) : (
        <>
          <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogoIcon size={22} />
            <span className="text-lg font-extrabold tracking-tight">Weather Tomorrow</span>
          </Link>
          {subtitle && (
            <p className="text-white/35 text-sm mt-1 font-medium">{subtitle}</p>
          )}
          {lastUpdated && (
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-white/25 font-semibold uppercase tracking-wider">
                Updated {lastUpdated}
              </span>
            </div>
          )}
        </>
      )}
    </header>
  );
}
