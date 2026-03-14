import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Default thumbnail for Beehiiv publication / social sharing
// 1200x630 as recommended
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(170deg, #020617 0%, #0c1445 25%, #1e3a8a 55%, #2563eb 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            {/* Sun */}
            <circle cx="65" cy="28" r="20" fill="#FBBF24" opacity="0.95" />
            <circle cx="65" cy="28" r="15" fill="#FDE68A" opacity="0.5" />
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

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Weather Tomorrow
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.45)",
            marginBottom: 40,
          }}
        >
          Tomorrow&apos;s forecast for any city — delivered daily
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Free & Accurate", "Updated Hourly", "Any City Worldwide"].map((text) => (
            <div
              key={text}
              style={{
                padding: "10px 24px",
                borderRadius: 50,
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.2)",
            letterSpacing: "0.05em",
          }}
        >
          weathertomorrow.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
