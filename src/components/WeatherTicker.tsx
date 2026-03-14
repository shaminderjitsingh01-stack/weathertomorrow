import Link from "next/link";
import { fetchLandingWeather } from "@/lib/landing-weather";
import { getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";

export default async function WeatherTicker() {
  const cities = await fetchLandingWeather(15);

  if (cities.length === 0) return null;

  // Duplicate for seamless infinite loop
  const items = [...cities, ...cities];

  return (
    <div className="ticker-container overflow-hidden border-b border-white/5 bg-black/20 backdrop-blur-sm pr-[85px]">
      <div className="ticker-scroll flex items-center gap-8 py-2 px-4 whitespace-nowrap">
        {items.map((city, i) => (
          <Link
            key={`${city.slug}-${i}`}
            href={`/${city.slug}`}
            className="inline-flex items-center gap-2 text-[11px] text-white/50 hover:text-white/80 transition-colors shrink-0"
          >
            <span className="opacity-70">
              <WeatherIcon code={city.weatherCode} size={16} />
            </span>
            <span className="font-medium">{city.name}</span>
            <span className="text-white/70 font-semibold">{city.temp}°</span>
            <span className="text-white/30 hidden sm:inline">
              {getWeatherDescription(city.weatherCode)}
            </span>
            <span className="text-white/10">|</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
