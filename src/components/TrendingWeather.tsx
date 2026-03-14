import Link from "next/link";
import { fetchLandingWeather, type CityWeatherSummary } from "@/lib/landing-weather";
import WeatherIcon from "./WeatherIcon";

export default async function TrendingWeather() {
  const cities = await fetchLandingWeather(20);

  if (cities.length < 3) return null;

  // Find hottest, coldest, and most rainy
  const hottest = cities.reduce((a, b) => (a.temp > b.temp ? a : b));
  const coldest = cities.reduce((a, b) => (a.temp < b.temp ? a : b));
  const mostRain = cities.reduce((a, b) =>
    a.precipitation > b.precipitation ? a : b
  );

  const trends: {
    label: string;
    emoji: string;
    city: CityWeatherSummary;
    value: string;
    sublabel: string;
  }[] = [
    {
      label: "Hottest",
      emoji: "🔥",
      city: hottest,
      value: `${hottest.temp}°C`,
      sublabel: "highest temp today",
    },
    {
      label: "Coldest",
      emoji: "🥶",
      city: coldest,
      value: `${coldest.temp}°C`,
      sublabel: "lowest high today",
    },
    {
      label: "Most Rain",
      emoji: "🌧️",
      city: mostRain,
      value:
        mostRain.precipitation > 0
          ? `${mostRain.precipitation.toFixed(1)}mm`
          : `${mostRain.rainChance}%`,
      sublabel:
        mostRain.precipitation > 0 ? "precipitation" : "chance of rain",
    },
  ];

  return (
    <div>
      <p className="section-label mb-3 text-center">Trending Right Now</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {trends.map((trend) => (
          <Link
            key={trend.label}
            href={`/${trend.city.slug}`}
            className="card-interactive rounded-2xl p-3 text-center group"
          >
            <div className="text-lg mb-1">{trend.emoji}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
              {trend.label}
            </div>
            <div className="flex justify-center mb-1.5 animate-float">
              <WeatherIcon code={trend.city.weatherCode} size={28} />
            </div>
            <div className="text-sm font-bold text-white/90 mb-0.5">
              {trend.value}
            </div>
            <div className="text-[11px] font-medium text-white/60 truncate">
              {trend.city.name}
            </div>
            <div className="text-[9px] text-white/30 mt-0.5">
              {trend.sublabel}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
