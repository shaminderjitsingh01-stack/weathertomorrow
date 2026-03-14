// Professional SVG weather icons — no emojis
// Based on WMO weather interpretation codes

export default function WeatherIcon({
  code,
  isDay = true,
  size = 96,
}: {
  code: number;
  isDay?: boolean;
  size?: number;
}) {
  const className = `w-[${size}px] h-[${size}px]`;

  // Clear sky
  if (code === 0) {
    if (isDay) {
      return (
        <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
          <circle cx="48" cy="48" r="20" fill="#FBBF24" />
          <circle cx="48" cy="48" r="16" fill="#FCD34D" />
          {/* Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="48"
              y1="48"
              x2={48 + 30 * Math.cos((angle * Math.PI) / 180)}
              y2={48 + 30 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
        </svg>
      );
    }
    // Night clear
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M52 24C40.954 24 32 32.954 32 44s8.954 20 20 20c4.374 0 8.427-1.405 11.718-3.787C60.89 64.676 55.71 68 49.8 68 39.39 68 31 59.61 31 49.2c0-9.078 6.414-16.65 14.95-18.432A20.09 20.09 0 0052 24z"
          fill="#CBD5E1"
        />
        <circle cx="62" cy="30" r="1.5" fill="#E2E8F0" />
        <circle cx="70" cy="42" r="1" fill="#E2E8F0" />
        <circle cx="58" cy="20" r="1" fill="#E2E8F0" />
      </svg>
    );
  }

  // Partly cloudy
  if (code === 1 || code === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        {isDay && (
          <>
            <circle cx="58" cy="32" r="14" fill="#FBBF24" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1="58"
                y1="32"
                x2={58 + 22 * Math.cos((angle * Math.PI) / 180)}
                y2={32 + 22 * Math.sin((angle * Math.PI) / 180)}
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            ))}
          </>
        )}
        <path
          d="M28 62c0-7.732 6.268-14 14-14 5.17 0 9.69 2.802 12.124 6.97A10 10 0 0156 54c5.523 0 10 4.477 10 10v.5H28V62z"
          fill="#94A3B8"
        />
        <path
          d="M28 62c0-7.732 6.268-14 14-14 5.17 0 9.69 2.802 12.124 6.97A10 10 0 0156 54c5.523 0 10 4.477 10 10v.5H28V62z"
          fill="white"
          opacity="0.15"
        />
      </svg>
    );
  }

  // Overcast
  if (code === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M22 58c0-9.389 7.611-17 17-17 6.28 0 11.77 3.404 14.72 8.465A12.5 12.5 0 0156.5 48C63.404 48 69 53.596 69 60.5V62H22v-4z"
          fill="#64748B"
        />
        <path
          d="M32 66c0-7.18 5.82-13 13-13 4.825 0 9.04 2.628 11.3 6.527A9.5 9.5 0 0158.5 58c5.247 0 9.5 4.253 9.5 9.5V69H32v-3z"
          fill="#94A3B8"
        />
      </svg>
    );
  }

  // Fog
  if (code === 45 || code === 48) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <line x1="24" y1="40" x2="72" y2="40" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <line x1="28" y1="48" x2="68" y2="48" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <line x1="24" y1="56" x2="72" y2="56" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <line x1="30" y1="64" x2="66" y2="64" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </svg>
    );
  }

  // Drizzle / Light rain
  if (code >= 51 && code <= 57) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M24 50c0-8.284 6.716-15 15-15 5.635 0 10.555 3.115 13.114 7.712A11 11 0 0154 42c6.075 0 11 4.925 11 11v1H24v-4z"
          fill="#64748B"
        />
        <line x1="36" y1="60" x2="34" y2="68" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="48" y1="62" x2="46" y2="70" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <line x1="56" y1="60" x2="54" y2="68" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }

  // Rain
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M22 48c0-9.389 7.611-17 17-17 6.28 0 11.77 3.404 14.72 8.465A12.5 12.5 0 0156.5 38C63.404 38 69 43.596 69 50.5V52H22v-4z"
          fill="#475569"
        />
        <line x1="32" y1="58" x2="28" y2="70" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="56" x2="38" y2="68" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="52" y1="58" x2="48" y2="70" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="56" x2="58" y2="68" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M22 48c0-9.389 7.611-17 17-17 6.28 0 11.77 3.404 14.72 8.465A12.5 12.5 0 0156.5 38C63.404 38 69 43.596 69 50.5V52H22v-4z"
          fill="#94A3B8"
        />
        <circle cx="32" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="44" cy="66" r="2.5" fill="#E2E8F0" />
        <circle cx="56" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="38" cy="72" r="2" fill="#E2E8F0" opacity="0.7" />
        <circle cx="50" cy="74" r="2" fill="#E2E8F0" opacity="0.7" />
      </svg>
    );
  }

  // Thunderstorm
  if (code >= 95) {
    return (
      <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
        <path
          d="M20 46c0-9.941 8.059-18 18-18 6.632 0 12.434 3.594 15.554 8.94A13 13 0 0156 36c7.18 0 13 5.82 13 13v1H20v-4z"
          fill="#374151"
        />
        <path d="M44 54l-4 12h8l-4 14 12-16h-8l4-10H44z" fill="#FBBF24" />
      </svg>
    );
  }

  // Default — partly cloudy
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className}>
      <path
        d="M24 58c0-8.837 7.163-16 16-16 5.914 0 11.086 3.21 13.858 7.98A11.5 11.5 0 0156 49c6.351 0 11.5 5.149 11.5 11.5V62H24v-4z"
        fill="#94A3B8"
      />
    </svg>
  );
}

// Smaller icon for hourly display
export function WeatherIconSmall({
  code,
  isDay = true,
}: {
  code: number;
  isDay?: boolean;
}) {
  return <WeatherIcon code={code} isDay={isDay} size={36} />;
}
