import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";
import type { CityWeatherSummary } from "@/lib/landing-weather";

const REGIONS = [
  {
    label: "Americas",
    slugs: ["new-york", "los-angeles", "chicago", "miami", "toronto", "mexico-city", "sao-paulo"],
  },
  {
    label: "Europe",
    slugs: ["london", "paris", "berlin", "madrid", "rome", "amsterdam", "istanbul"],
  },
  {
    label: "Asia & Oceania",
    slugs: ["tokyo", "singapore", "dubai", "mumbai", "bangkok", "seoul", "sydney"],
  },
];

async function fetchRegionWeather(
  slugs: string[]
): Promise<Map<string, CityWeatherSummary>> {
  const map = new Map<string, CityWeatherSummary>();

  const fetches = slugs.map(async (slug) => {
    const city = CITIES[slug];
    if (!city) return;

    try {
      const params = new URLSearchParams({
        latitude: city.latitude.toString(),
        longitude: city.longitude.toString(),
        daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,precipitation_probability_max",
        timezone: "auto",
        forecast_days: "1",
      });

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        { next: { revalidate: 3600 } }
      );

      if (!res.ok) return;
      const data = await res.json();

      map.set(slug, {
        slug,
        name: city.name,
        country: city.countryCode,
        temp: Math.round(data.daily.temperature_2m_max[0]),
        tempMin: Math.round(data.daily.temperature_2m_min[0]),
        weatherCode: data.daily.weather_code[0],
        precipitation: data.daily.precipitation_sum[0] ?? 0,
        rainChance: data.daily.precipitation_probability_max[0] ?? 0,
      });
    } catch {
      // Skip failed fetches silently
    }
  });

  await Promise.all(fetches);
  return map;
}

export default async function PopularCities() {
  // Fetch all region cities in parallel
  const allSlugs = REGIONS.flatMap((r) => r.slugs);
  const weatherMap = await fetchRegionWeather(allSlugs);

  return (
    <div className="space-y-8">
      {REGIONS.map((region) => (
        <div key={region.label}>
          <p className="section-label mb-4 text-center">{region.label}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {region.slugs.map((slug) => {
              const weather = weatherMap.get(slug);
              const city = CITIES[slug];
              if (!city) return null;

              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="card-interactive rounded-2xl p-3.5 group"
                >
                  {weather ? (
                    <div className="flex flex-col items-center text-center gap-1.5">
                      <span className="animate-float inline-flex">
                        <WeatherIcon code={weather.weatherCode} size={36} />
                      </span>
                      <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors truncate w-full">
                        {city.name}
                      </span>
                      <span className="text-2xl font-extrabold tracking-tight text-white/90">
                        {weather.temp}°
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-medium">
                        <span>H:{weather.temp}°</span>
                        <span className="text-white/15">|</span>
                        <span>L:{weather.tempMin}°</span>
                      </div>
                      <span className="text-[10px] text-white/30 font-medium truncate w-full">
                        {getWeatherDescription(weather.weatherCode)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-2 py-3">
                      <span className="text-sm font-medium text-white/60">
                        {city.name}
                      </span>
                      <div className="skeleton w-8 h-8 rounded-full" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
