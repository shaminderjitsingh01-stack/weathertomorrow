import { NextRequest, NextResponse } from "next/server";
import { getWeatherByCoords } from "@/lib/weather";
import { getCityBySlug, slugToQuery } from "@/lib/cities";
import { searchLocations } from "@/lib/weather";
import { generateWeatherEmailHtml, generateSubjectLine } from "@/lib/email-template";

// Preview the newsletter email for any city
// Usage: /api/preview-email?city=singapore&type=today
export async function GET(request: NextRequest) {
  const citySlug = request.nextUrl.searchParams.get("city") || "new-york";
  const forecastType = (request.nextUrl.searchParams.get("type") || "tomorrow") as "today" | "tomorrow";

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
    forecastType,
    "https://weathertomorrow.app/preferences?email=demo@example.com&token=preview"
  );

  const primaryDay = forecastType === "today" ? weather.today : weather.tomorrow;
  const subject = generateSubjectLine(cityName, primaryDay, forecastType);

  const otherType = forecastType === "today" ? "tomorrow" : "today";
  const toggleLabel = forecastType === "today" ? "Tomorrow's version" : "Today's version";

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
    .toggle-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 16px 24px;
      background: #12122a;
    }
    .toggle-btn {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
    }
    .toggle-btn.active {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }
    .toggle-btn.inactive {
      background: rgba(255, 255, 255, 0.05);
      color: #555;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .toggle-btn.inactive:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #888;
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
      line-height: 2;
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
    <div class="badge">Email Preview — ${forecastType === "today" ? "Today's Weather" : "Tomorrow's Weather"}</div>
    <div><strong>From:</strong> Weather Tomorrow &lt;hello@weathertomorrow.app&gt;</div>
    <div><strong>To:</strong> subscriber@example.com</div>
    <div class="preview-subject">${subject}</div>
  </div>

  <div class="toggle-bar">
    <a href="/api/preview-email?city=${citySlug}&type=today" class="toggle-btn ${forecastType === "today" ? "active" : "inactive"}">Today's Email</a>
    <a href="/api/preview-email?city=${citySlug}&type=tomorrow" class="toggle-btn ${forecastType === "tomorrow" ? "active" : "inactive"}">Tomorrow's Email</a>
  </div>

  <div class="email-container">
    <div class="email-body">
      ${html}
    </div>
  </div>

  <div class="preview-footer">
    Try other cities:
    <a href="/api/preview-email?city=london&type=${forecastType}">London</a> ·
    <a href="/api/preview-email?city=tokyo&type=${forecastType}">Tokyo</a> ·
    <a href="/api/preview-email?city=dubai&type=${forecastType}">Dubai</a> ·
    <a href="/api/preview-email?city=singapore&type=${forecastType}">Singapore</a> ·
    <a href="/api/preview-email?city=mumbai&type=${forecastType}">Mumbai</a> ·
    <a href="/api/preview-email?city=sydney&type=${forecastType}">Sydney</a>
  </div>
</body>
</html>`;

  return new NextResponse(previewHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
