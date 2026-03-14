import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { getCityBySlug, slugToQuery } from "@/lib/cities";
import { getWeatherByCoords, getWeatherDescription, searchLocations } from "@/lib/weather";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ city: string }> }
) {
  const { city: slug } = await params;

  // Resolve city
  let cityName = "Unknown";
  let country = "";
  let lat = 0;
  let lon = 0;
  let tz = "auto";

  const curated = getCityBySlug(slug);
  if (curated) {
    cityName = curated.name;
    country = curated.country;
    lat = curated.latitude;
    lon = curated.longitude;
    tz = curated.timezone;
  } else {
    const query = slugToQuery(slug);
    const results = await searchLocations(query);
    if (results.length > 0) {
      cityName = results[0].name;
      country = results[0].country;
      lat = results[0].latitude;
      lon = results[0].longitude;
      tz = results[0].timezone;
    }
  }

  let tempMax = "--";
  let tempMin = "--";
  let description = "Forecast";

  try {
    const weather = await getWeatherByCoords(lat, lon, tz);
    tempMax = `${Math.round(weather.tomorrow.temperatureMax)}°`;
    tempMin = `${Math.round(weather.tomorrow.temperatureMin)}°`;
    description = getWeatherDescription(weather.tomorrow.weatherCode);
  } catch {
    // Use defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(170deg, #020617 0%, #0c1445 25%, #1e3a8a 55%, #1d4ed8 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", opacity: 0.5 }}>
          <div style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            weathertomorrow.app
          </div>
        </div>

        <div style={{ fontSize: "28px", opacity: 0.4, marginBottom: "8px", fontWeight: 600 }}>
          Weather Tomorrow in
        </div>

        <div style={{ fontSize: "64px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
          {cityName}
        </div>

        {country && (
          <div style={{ fontSize: "22px", opacity: 0.35, marginBottom: "32px", fontWeight: 500 }}>
            {country}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "16px" }}>
          <span style={{ fontSize: "120px", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {tempMax}
          </span>
          <span style={{ fontSize: "48px", fontWeight: 600, opacity: 0.3 }}>
            {tempMin}
          </span>
        </div>

        <div style={{ fontSize: "28px", opacity: 0.6, fontWeight: 600 }}>
          {description}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
