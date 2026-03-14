// Professional weather icons with SVG gradients and proper design

function SunIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1={50 + 26 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 26 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FBBF24"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      <circle cx="50" cy="50" r="22" fill="url(#sunGlow)" />
      <circle cx="44" cy="44" r="6" fill="#FDE68A" opacity="0.5" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="moonGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
      </defs>
      <circle cx="48" cy="48" r="22" fill="url(#moonGlow)" />
      <circle cx="36" cy="36" r="18" fill="#1e293b" />
      {/* Stars */}
      <circle cx="72" cy="28" r="1.8" fill="#E2E8F0" opacity="0.8" />
      <circle cx="78" cy="48" r="1.2" fill="#E2E8F0" opacity="0.6" />
      <circle cx="66" cy="18" r="1" fill="#E2E8F0" opacity="0.5" />
      <circle cx="82" cy="34" r="0.8" fill="#E2E8F0" opacity="0.4" />
    </svg>
  );
}

function CloudIcon({ size, color = "#94A3B8" }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`cloudGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="52" rx="30" ry="18" fill={`url(#cloudGrad-${color})`} />
      <ellipse cx="36" cy="46" rx="18" ry="16" fill={color} opacity="0.9" />
      <ellipse cx="62" cy="44" rx="16" ry="14" fill={color} opacity="0.85" />
      <ellipse cx="48" cy="38" rx="14" ry="12" fill={color} opacity="0.95" />
    </svg>
  );
}

function PartlyCloudyIcon({ size, isDay }: { size: number; isDay: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="pcSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id="pcCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {isDay ? (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={62 + 14 * Math.cos((angle * Math.PI) / 180)}
              y1={30 + 14 * Math.sin((angle * Math.PI) / 180)}
              x2={62 + 22 * Math.cos((angle * Math.PI) / 180)}
              y2={30 + 22 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          ))}
          <circle cx="62" cy="30" r="12" fill="url(#pcSun)" />
        </>
      ) : (
        <>
          <circle cx="62" cy="30" r="11" fill="#CBD5E1" />
          <circle cx="54" cy="24" r="9" fill="#1e293b" />
        </>
      )}
      <ellipse cx="42" cy="60" rx="28" ry="15" fill="url(#pcCloud)" />
      <ellipse cx="30" cy="55" rx="16" ry="13" fill="#CBD5E1" />
      <ellipse cx="54" cy="53" rx="14" ry="11" fill="#CBD5E1" opacity="0.9" />
      <ellipse cx="40" cy="48" rx="12" ry="10" fill="#E2E8F0" />
    </svg>
  );
}

function RainIcon({ size, heavy = false }: { size: number; heavy?: boolean }) {
  const drops = heavy
    ? [
        { x: 26, delay: 0 }, { x: 36, delay: 0.3 }, { x: 46, delay: 0.1 },
        { x: 56, delay: 0.5 }, { x: 66, delay: 0.2 },
      ]
    : [{ x: 32, delay: 0 }, { x: 46, delay: 0.3 }, { x: 60, delay: 0.15 }];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      {/* Cloud */}
      <ellipse cx="50" cy="38" rx="30" ry="16" fill="url(#rainCloud)" />
      <ellipse cx="36" cy="33" rx="18" ry="14" fill="#64748B" />
      <ellipse cx="62" cy="31" rx="16" ry="12" fill="#64748B" opacity="0.9" />
      <ellipse cx="48" cy="26" rx="14" ry="11" fill="#94A3B8" opacity="0.6" />
      {/* Rain drops */}
      {drops.map((drop, i) => (
        <g key={i}>
          <line
            x1={drop.x}
            y1={54 + drop.delay * 10}
            x2={drop.x - 3}
            y2={68 + drop.delay * 10}
            stroke="#60A5FA"
            strokeWidth={heavy ? "3" : "2.5"}
            strokeLinecap="round"
            opacity="0.8"
          />
          {heavy && (
            <line
              x1={drop.x + 2}
              y1={72 + drop.delay * 8}
              x2={drop.x - 1}
              y2={82 + drop.delay * 8}
              stroke="#60A5FA"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

function SnowIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Cloud */}
      <ellipse cx="50" cy="36" rx="30" ry="16" fill="url(#snowCloud)" />
      <ellipse cx="36" cy="31" rx="18" ry="14" fill="#CBD5E1" opacity="0.9" />
      <ellipse cx="62" cy="29" rx="16" ry="12" fill="#CBD5E1" opacity="0.85" />
      <ellipse cx="48" cy="24" rx="14" ry="11" fill="#E2E8F0" opacity="0.7" />
      {/* Snowflakes */}
      {[
        { cx: 32, cy: 60 }, { cx: 50, cy: 56 }, { cx: 66, cy: 62 },
        { cx: 40, cy: 72 }, { cx: 58, cy: 74 },
      ].map((flake, i) => (
        <g key={i}>
          <circle cx={flake.cx} cy={flake.cy} r="3" fill="#E2E8F0" opacity="0.9" />
          <circle cx={flake.cx} cy={flake.cy} r="1.5" fill="white" />
        </g>
      ))}
    </svg>
  );
}

function ThunderstormIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      {/* Dark cloud */}
      <ellipse cx="50" cy="34" rx="32" ry="18" fill="url(#stormCloud)" />
      <ellipse cx="34" cy="28" rx="20" ry="16" fill="#374151" />
      <ellipse cx="64" cy="26" rx="18" ry="14" fill="#374151" opacity="0.9" />
      <ellipse cx="48" cy="22" rx="16" ry="12" fill="#64748B" opacity="0.4" />
      {/* Lightning bolt */}
      <path d="M48 42 L42 58 L50 56 L44 76 L60 52 L52 54 L56 42 Z" fill="#FBBF24" />
      <path d="M48 42 L42 58 L50 56 L44 76 L60 52 L52 54 L56 42 Z" fill="#FDE68A" opacity="0.5" />
      {/* Rain */}
      <line x1="30" y1="52" x2="28" y2="64" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="68" y1="50" x2="66" y2="62" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function FogIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {[
        { y: 30, w: 50, x: 25, o: 0.3 },
        { y: 40, w: 56, x: 22, o: 0.5 },
        { y: 50, w: 60, x: 20, o: 0.7 },
        { y: 60, w: 54, x: 23, o: 0.6 },
        { y: 70, w: 46, x: 27, o: 0.4 },
      ].map((line, i) => (
        <line
          key={i}
          x1={line.x}
          y1={line.y}
          x2={line.x + line.w}
          y2={line.y}
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={line.o}
        />
      ))}
    </svg>
  );
}

function DrizzleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="drizzleCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="38" rx="28" ry="15" fill="url(#drizzleCloud)" />
      <ellipse cx="36" cy="33" rx="16" ry="12" fill="#94A3B8" opacity="0.9" />
      <ellipse cx="60" cy="32" rx="14" ry="11" fill="#94A3B8" opacity="0.85" />
      <ellipse cx="48" cy="27" rx="12" ry="10" fill="#CBD5E1" opacity="0.5" />
      {/* Light drops */}
      {[34, 48, 62].map((x, i) => (
        <circle key={i} cx={x} cy={58 + i * 5} r="2" fill="#60A5FA" opacity="0.7" />
      ))}
      {[40, 54].map((x, i) => (
        <circle key={`b${i}`} cx={x} cy={68 + i * 4} r="1.5" fill="#60A5FA" opacity="0.5" />
      ))}
    </svg>
  );
}

export default function WeatherIcon({
  code,
  isDay = true,
  size = 96,
}: {
  code: number;
  isDay?: boolean;
  size?: number;
}) {
  if (code === 0) return isDay ? <SunIcon size={size} /> : <MoonIcon size={size} />;
  if (code <= 2) return <PartlyCloudyIcon size={size} isDay={isDay} />;
  if (code === 3) return <CloudIcon size={size} />;
  if (code <= 48) return <FogIcon size={size} />;
  if (code <= 57) return <DrizzleIcon size={size} />;
  if (code <= 67 || (code >= 80 && code <= 82)) return <RainIcon size={size} heavy={code === 65 || code === 82} />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <SnowIcon size={size} />;
  if (code >= 95) return <ThunderstormIcon size={size} />;
  return <CloudIcon size={size} />;
}

export function WeatherIconSmall({
  code,
  isDay = true,
}: {
  code: number;
  isDay?: boolean;
}) {
  return <WeatherIcon code={code} isDay={isDay} size={40} />;
}
