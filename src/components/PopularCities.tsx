import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";
import { fetchLandingWeather } from "@/lib/landing-weather";

const REGIONS = [
  {
    label: "Americas",
    slugs: ["new-york", "los-angeles", "miami", "toronto", "mexico-city", "sao-paulo"],
  },
  {
    label: "Europe",
    slugs: ["london", "paris", "berlin", "rome", "istanbul", "moscow"],
  },
  {
    label: "Asia & Oceania",
    slugs: ["tokyo", "singapore", "dubai", "mumbai", "bangkok", "sydney"],
  },
];

export default async function PopularCities() {
  // Reuse the shared landing weather data — no extra API calls
  const allWeather = await fetchLandingWeather();
  const weatherMap = new Map(allWeather.map((w) => [w.slug, w]));

  return (
    <div className="space-y-6 sm:space-y-8">
      {REGIONS.map((region) => (
        <div key={region.label}>
          <p className="section-label mb-3 text-center">{region.label}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {region.slugs.map((slug) => {
              const weather = weatherMap.get(slug);
              const city = CITIES[slug];
              if (!city) return null;

              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="card-interactive rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center text-center group"
                >
                  {weather ? (
                    <>
                      <span className="animate-float inline-flex mb-1">
                        <WeatherIcon code={weather.weatherCode} size={36} />
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-medium text-white/60 group-hover:text-white/80 transition-colors">
                        {city.name}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white/90">
                        {weather.temp}°
                      </span>
                      <span className="text-[10px] text-white/30">
                        {weather.tempMin}° low
                      </span>
                      <span className="text-[10px] text-white/25 mt-0.5 hidden sm:block">
                        {getWeatherDescription(weather.weatherCode)}
                      </span>
                    </>
                  ) : (
                    <span className="text-[13px] font-medium text-white/60 py-2">
                      {city.name}
                    </span>
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
