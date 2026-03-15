import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

const CATEGORY_COLORS: Record<string, string> = {
  "City Guide": "#22c55e",
  "Weather Tips": "#3b82f6",
  Seasonal: "#f59e0b",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Parse title from slug since we can't read filesystem in edge/serverless
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\?/g, "?");

  // Detect category from slug patterns
  const isCity = slug.includes("weather-") && (slug.includes("january") || slug.includes("february") || slug.includes("march") || slug.includes("april") || slug.includes("may") || slug.includes("june") || slug.includes("july") || slug.includes("august") || slug.includes("september") || slug.includes("october") || slug.includes("november") || slug.includes("december"));
  const category = isCity ? "City Guide" : "Weather Tips";
  const readTime = 3;
  const categoryColor = CATEGORY_COLORS[category] || "#3b82f6";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(170deg, #020617 0%, #0c1445 25%, #1e3a8a 55%, #2563eb 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Weather icon watermark */}
        <div style={{ position: "absolute", top: 40, right: 60, opacity: 0.08, display: "flex" }}>
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
            <circle cx="65" cy="28" r="20" fill="white" />
            <ellipse cx="42" cy="68" rx="32" ry="16" fill="white" />
            <ellipse cx="28" cy="60" rx="20" ry="16" fill="white" />
            <ellipse cx="55" cy="58" rx="18" ry="14" fill="white" />
            <ellipse cx="40" cy="54" rx="16" ry="13" fill="white" />
          </svg>
        </div>

        {/* Top bar: logo + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="22" cy="10" r="7" fill="#FBBF24" opacity="0.85" />
              <ellipse cx="15" cy="22" rx="11" ry="6.5" fill="white" opacity="0.9" />
              <ellipse cx="10" cy="19" rx="7" ry="6" fill="white" opacity="0.85" />
              <ellipse cx="20" cy="18.5" rx="6" ry="5" fill="white" opacity="0.8" />
              <ellipse cx="14" cy="16.5" rx="5.5" ry="4.5" fill="white" opacity="0.95" />
            </svg>
            <span style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
              weathertomorrow.app
            </span>
          </div>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              background: `${categoryColor}22`,
              border: `1px solid ${categoryColor}44`,
              color: categoryColor,
              fontSize: 14,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
            }}
          >
            {category}
          </div>
        </div>

        {/* Title */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <h1
            style={{
              fontSize: title.length > 50 ? 48 : 56,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            {readTime} min read
          </span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.15)" }}>|</span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            Free daily forecast newsletter
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
