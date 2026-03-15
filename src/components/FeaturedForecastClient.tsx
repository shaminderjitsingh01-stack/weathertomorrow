"use client";

import { useState } from "react";
import Link from "next/link";
import WeatherIcon from "./WeatherIcon";

interface DayData {
  temp: number;
  tempMin: number;
  weatherCode: number;
  rainChance: number;
  windSpeed: number;
  uvIndex: number;
  description: string;
}

export default function FeaturedForecastClient({
  slug,
  name,
  country,
  today,
  tomorrow,
}: {
  slug: string;
  name: string;
  country: string;
  today: DayData;
  tomorrow: DayData;
}) {
  const [activeDay, setActiveDay] = useState<"today" | "tomorrow">("tomorrow");
  const weather = activeDay === "today" ? today : tomorrow;

  return (
    <div className="card-featured rounded-3xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between mb-3">
        <p className="section-label">Spotlight</p>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveDay("today")}
            className={`px-3 py-1 rounded-l-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "today"
                ? "bg-white/12 text-white"
                : "bg-white/4 text-white/30 hover:text-white/50"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveDay("tomorrow")}
            className={`px-3 py-1 rounded-r-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeDay === "tomorrow"
                ? "bg-white/12 text-white"
                : "bg-white/4 text-white/30 hover:text-white/50"
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="flex-shrink-0 animate-float">
          <WeatherIcon code={weather.weatherCode} size={80} />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-0.5">
            {name}
          </h2>
          <p className="text-xs text-white/40 font-medium mb-3">{country}</p>

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

          <p className="text-sm font-semibold text-white/70">{weather.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/8">
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">Rain</p>
          <p className="text-sm font-bold">{weather.rainChance}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">Wind</p>
          <p className="text-sm font-bold">{weather.windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">UV</p>
          <p className="text-sm font-bold">{Number(weather.uvIndex).toFixed(1)}</p>
        </div>
      </div>

      <Link
        href={`/${slug}`}
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
