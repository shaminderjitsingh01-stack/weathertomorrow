import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Favicon PNG — 32x32, 48x48, 192x192, 512x512
// Usage: /api/logo/favicon?size=32
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = parseInt(searchParams.get("size") || "192", 10);

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
          {/* Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={String(65 + 24 * Math.cos((angle * Math.PI) / 180))}
              y1={String(28 + 24 * Math.sin((angle * Math.PI) / 180))}
              x2={String(65 + 32 * Math.cos((angle * Math.PI) / 180))}
              y2={String(28 + 32 * Math.sin((angle * Math.PI) / 180))}
              stroke="#FBBF24"
              strokeWidth="3.5"
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
