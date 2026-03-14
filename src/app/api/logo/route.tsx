import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Generate logo PNG at any size
// Usage: /api/logo?size=512 (default 512)
// Also: /api/logo?size=192 for PWA icon
// Also: /api/logo?size=64 for favicon
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = parseInt(searchParams.get("size") || "512", 10);
  const variant = searchParams.get("variant") || "full"; // "full" | "icon" | "dark"

  if (variant === "icon") {
    // Icon only — no text, just the sun+cloud mark
    return new ImageResponse(
      (
        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
            borderRadius: size * 0.22,
          }}
        >
          <svg
            width={size * 0.7}
            height={size * 0.7}
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Sun */}
            <circle cx="65" cy="28" r="20" fill="#FBBF24" opacity="0.95" />
            <circle cx="65" cy="28" r="15" fill="#FDE68A" opacity="0.5" />
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1={String(65 + 24 * Math.cos((angle * Math.PI) / 180))}
                y1={String(28 + 24 * Math.sin((angle * Math.PI) / 180))}
                x2={String(65 + 32 * Math.cos((angle * Math.PI) / 180))}
                y2={String(28 + 32 * Math.sin((angle * Math.PI) / 180))}
                stroke="#FBBF24"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />
            ))}
            {/* Cloud */}
            <ellipse cx="42" cy="68" rx="32" ry="16" fill="white" opacity="0.95" />
            <ellipse cx="28" cy="60" rx="20" ry="16" fill="white" opacity="0.9" />
            <ellipse cx="55" cy="58" rx="18" ry="14" fill="white" opacity="0.88" />
            <ellipse cx="40" cy="54" rx="16" ry="13" fill="white" />
          </svg>
        </div>
      ),
      { width: size, height: size }
    );
  }

  if (variant === "dark") {
    // Full logo on dark background
    return new ImageResponse(
      (
        <div
          style={{
            width: size,
            height: size * 0.35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: size * 0.03,
            background: "#0a0f1e",
            padding: `0 ${size * 0.06}px`,
          }}
        >
          <svg
            width={size * 0.12}
            height={size * 0.12}
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="65" cy="28" r="20" fill="#FBBF24" opacity="0.95" />
            <circle cx="65" cy="28" r="15" fill="#FDE68A" opacity="0.5" />
            <ellipse cx="42" cy="68" rx="32" ry="16" fill="white" opacity="0.95" />
            <ellipse cx="28" cy="60" rx="20" ry="16" fill="white" opacity="0.9" />
            <ellipse cx="55" cy="58" rx="18" ry="14" fill="white" opacity="0.88" />
            <ellipse cx="40" cy="54" rx="16" ry="13" fill="white" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: size * 0.07,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Weather Tomorrow
            </span>
            <span
              style={{
                fontSize: size * 0.025,
                fontWeight: 600,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.02em",
              }}
            >
              Tomorrow&apos;s forecast, instantly
            </span>
          </div>
        </div>
      ),
      { width: size, height: Math.round(size * 0.35) }
    );
  }

  // Full logo — icon + text on transparent/white
  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: Math.round(size * 0.35),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: size * 0.03,
          background: "white",
          padding: `0 ${size * 0.06}px`,
        }}
      >
        {/* Icon with gradient background */}
        <div
          style={{
            width: size * 0.13,
            height: size * 0.13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
            borderRadius: size * 0.025,
          }}
        >
          <svg
            width={size * 0.09}
            height={size * 0.09}
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="65" cy="28" r="20" fill="#FBBF24" opacity="0.95" />
            <circle cx="65" cy="28" r="15" fill="#FDE68A" opacity="0.5" />
            <ellipse cx="42" cy="68" rx="32" ry="16" fill="white" opacity="0.95" />
            <ellipse cx="28" cy="60" rx="20" ry="16" fill="white" opacity="0.9" />
            <ellipse cx="55" cy="58" rx="18" ry="14" fill="white" opacity="0.88" />
            <ellipse cx="40" cy="54" rx="16" ry="13" fill="white" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: size * 0.07,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Weather Tomorrow
          </span>
          <span
            style={{
              fontSize: size * 0.025,
              fontWeight: 600,
              color: "#94a3b8",
              letterSpacing: "0.02em",
            }}
          >
            Tomorrow&apos;s forecast, instantly
          </span>
        </div>
      </div>
    ),
    { width: size, height: Math.round(size * 0.35) }
  );
}
