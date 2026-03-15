import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Parse title from slug
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Detect category from slug patterns
  const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  const isCity = slug.includes("weather") && monthNames.some((m) => slug.includes(m));
  const category = isCity ? "City Guide" : "Weather Tips";
  const categoryColor = isCity ? "#22c55e" : "#3b82f6";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(170deg, #020617 0%, #0c1445 25%, #1e3a8a 55%, #2563eb 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
        }}
      >
        {/* Top: logo + category */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "28px" }}>⛅</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>
              weathertomorrow.app
            </div>
          </div>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              background: `${categoryColor}22`,
              border: `1px solid ${categoryColor}44`,
              color: categoryColor,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {category.toUpperCase()}
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ display: "flex", alignItems: "center", flex: 1, paddingTop: "20px", paddingBottom: "20px" }}>
          <div
            style={{
              fontSize: title.length > 50 ? "48px" : "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            3 min read
          </div>
          <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.15)" }}>|</div>
          <div style={{ fontSize: "16px", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
            Free daily forecast newsletter
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
