import Link from "next/link";
import { getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";
import { LANDING_CITIES, type CityWeatherSummary } from "@/lib/landing-weather";

// Rotate through major global cities every 2 hours
// Cities are ordered so each appears during its region's relevant hours
const SPOTLIGHT_ROTATION = [
  { slug: "sydney", name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },       // 00:00 UTC
  { slug: "tokyo", name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },          // 02:00 UTC
  { slug: "singapore", name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198 },   // 04:00 UTC
  { slug: "dubai", name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },           // 06:00 UTC
  { slug: "mumbai", name: "Mumbai", country: "IN", lat: 19.076, lon: 72.8777 },          // 08:00 UTC
  { slug: "istanbul", name: "Istanbul", country: "TR", lat: 41.0082, lon: 28.9784 },     // 10:00 UTC
  { slug: "london", name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },         // 12:00 UTC
  { slug: "paris", name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },            // 14:00 UTC
  { slug: "new-york", name: "New York", country: "US", lat: 40.7128, lon: -74.006 },     // 16:00 UTC
  { slug: "los-angeles", name: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437 }, // 18:00 UTC
  { slug: "sao-paulo", name: "São Paulo", country: "BR", lat: -23.5505, lon: -46.6333 }, // 20:00 UTC
  { slug: "mexico-city", name: "Mexico City", country: "MX", lat: 19.4326, lon: -99.1332 }, // 22:00 UTC
];

function getSpotlightCity() {
  const utcHour = new Date().getUTCHours();
  const index = Math.floor(utcHour / 2) % SPOTLIGHT_ROTATION.length;
  return SPOTLIGHT_ROTATION[index];
}

async function fetchSpotlightWeather(
  city: typeof SPOTLIGHT_ROTATION[number]
): Promise<CityWeatherSummary | null> {
  try {
    const params = new URLSearchParams({
      latitude: city.lat.toString(),
      longitude: city.lon.toString(),
      daily:
        "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
      timezone: "auto",
      forecast_days: "2",
    });

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;
    const data = await res.json();

    return {
      slug: city.slug,
      name: city.name,
      country: city.country,
      temp: Math.round(data.daily.temperature_2m_max[1]),
      tempMin: Math.round(data.daily.temperature_2m_min[1]),
      weatherCode: data.daily.weather_code[1],
      precipitation: data.daily.precipitation_sum[1] ?? 0,
      rainChance: data.daily.precipitation_probability_max[1] ?? 0,
      windSpeed: Math.round(data.daily.wind_speed_10m_max?.[1] ?? 0),
      uvIndex: data.daily.uv_index_max?.[1] ?? 0,
    } as CityWeatherSummary & { windSpeed: number; uvIndex: number };
  } catch {
    return null;
  }
}

export default async function FeaturedForecast() {
  const spotlightCity = getSpotlightCity();
  const weather = await fetchSpotlightWeather(spotlightCity);

  if (!weather) return null;

  const description = getWeatherDescription(weather.weatherCode);

  // Extract extra fields we fetched
  const extra = weather as CityWeatherSummary & {
    windSpeed?: number;
    uvIndex?: number;
  };

  return (
    <div className="card-featured rounded-3xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-1">
        <p className="section-label">Tomorrow&apos;s Spotlight</p>
        <span className="text-[10px] text-white/25 font-semibold uppercase tracking-wider">
          Live
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Weather icon */}
        <div className="flex-shrink-0 animate-float">
          <WeatherIcon code={weather.weatherCode} size={80} />
        </div>

        {/* Main info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-0.5">
            {weather.name}
          </h2>
          <p className="text-xs text-white/40 font-medium mb-3">
            {weather.country}
          </p>

          <div className="flex items-baseline justify-center sm:justify-start gap-2 mb-1">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-none">
              {weather.temp}°
            </span>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-white/35">
                {weather.tempMin}°
              </span>
              <span className="text-[9px] text-white/20 font-semibold uppercase tracking-wider">
                Low
              </span>
            </div>
          </div>

          <p className="text-sm font-semibold text-white/70">{description}</p>
        </div>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/8">
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">
            Rain
          </p>
          <p className="text-sm font-bold">{weather.rainChance}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">
            Wind
          </p>
          <p className="text-sm font-bold">
            {extra.windSpeed ?? "—"} km/h
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">
            UV
          </p>
          <p className="text-sm font-bold">
            {extra.uvIndex != null
              ? Number(extra.uvIndex).toFixed(1)
              : "—"}
          </p>
        </div>
      </div>

      {/* CTA link */}
      <Link
        href={`/${weather.slug}`}
        className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/8 hover:bg-white/12 transition-colors text-sm font-bold text-white/80 hover:text-white group"
      >
        View full forecast
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-x-0.5 transition-transform"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
