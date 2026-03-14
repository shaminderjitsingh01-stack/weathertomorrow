import { NextRequest, NextResponse } from "next/server";
import { getWeatherByCoords } from "@/lib/weather";
import { getCityBySlug, slugToQuery } from "@/lib/cities";
import { searchLocations } from "@/lib/weather";
import { generateWeatherEmailHtml, generateSubjectLine } from "@/lib/email-template";

// Preview the newsletter email for any city
// Usage: /api/preview-email?city=singapore
export async function GET(request: NextRequest) {
  const citySlug = request.nextUrl.searchParams.get("city") || "new-york";

  // Resolve city
  let cityName = "New York";
  let country = "United States";
  let lat = 40.7128;
  let lon = -74.006;
  let tz = "America/New_York";

  const curated = getCityBySlug(citySlug);
  if (curated) {
    cityName = curated.name;
    country = curated.country;
    lat = curated.latitude;
    lon = curated.longitude;
    tz = curated.timezone;
  } else {
    const query = slugToQuery(citySlug);
    const results = await searchLocations(query);
    if (results.length > 0) {
      cityName = results[0].name;
      country = results[0].country;
      lat = results[0].latitude;
      lon = results[0].longitude;
      tz = results[0].timezone;
    }
  }

  const weather = await getWeatherByCoords(lat, lon, tz);

  const html = generateWeatherEmailHtml(
    cityName,
    country,
    weather.today,
    weather.tomorrow,
    weather.tomorrow.date
  );

  const subject = generateSubjectLine(cityName, weather.tomorrow);

  // Wrap in a full HTML page with email-like preview styling
  const previewHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Email Preview: ${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #1a1a2e;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .preview-header {
      background: #0f0f23;
      border-bottom: 1px solid #2a2a4a;
      padding: 20px 24px;
      color: #888;
      font-size: 13px;
    }
    .preview-header strong {
      color: #ccc;
    }
    .preview-subject {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      margin-top: 8px;
    }
    .email-container {
      max-width: 520px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .email-body {
      padding: 8px;
    }
    .preview-footer {
      text-align: center;
      padding: 24px;
      color: #555;
      font-size: 12px;
    }
    .preview-footer a {
      color: #6366f1;
      text-decoration: none;
    }
    .badge {
      display: inline-block;
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <div class="preview-header">
    <div class="badge">Email Preview</div>
    <div><strong>From:</strong> Weather Tomorrow &lt;hello@weathertomorrow.app&gt;</div>
    <div><strong>To:</strong> subscriber@example.com</div>
    <div class="preview-subject">${subject}</div>
  </div>
  <div class="email-container">
    <div class="email-body">
      ${html}
    </div>
  </div>
  <div class="preview-footer">
    This is a preview. Try other cities:
    <a href="/api/preview-email?city=london">London</a> ·
    <a href="/api/preview-email?city=tokyo">Tokyo</a> ·
    <a href="/api/preview-email?city=dubai">Dubai</a> ·
    <a href="/api/preview-email?city=singapore">Singapore</a> ·
    <a href="/api/preview-email?city=mumbai">Mumbai</a> ·
    <a href="/api/preview-email?city=sydney">Sydney</a>
  </div>
</body>
</html>`;

  return new NextResponse(previewHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
