"use client";

import { useState } from "react";
import { DailyForecast } from "@/lib/weather";
import WeatherCardClient from "./WeatherCardClient";

export default function DayToggle({
  today,
  tomorrow,
  cityName,
}: {
  today: DailyForecast;
  tomorrow: DailyForecast;
  cityName: string;
}) {
  const [activeDay, setActiveDay] = useState<"tomorrow" | "today">("tomorrow");
  const active = activeDay === "tomorrow" ? tomorrow : today;
  const compare = activeDay === "tomorrow" ? today : tomorrow;

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-1 mb-4">
        <button
          onClick={() => setActiveDay("today")}
          className={`px-4 py-2 rounded-l-xl text-sm font-bold transition-all cursor-pointer ${
            activeDay === "today"
              ? "bg-white/12 text-white"
              : "bg-white/4 text-white/30 hover:text-white/50"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setActiveDay("tomorrow")}
          className={`px-4 py-2 rounded-r-xl text-sm font-bold transition-all cursor-pointer ${
            activeDay === "tomorrow"
              ? "bg-white/12 text-white"
              : "bg-white/4 text-white/30 hover:text-white/50"
          }`}
        >
          Tomorrow
        </button>
      </div>

      <WeatherCardClient
        day={active}
        compare={compare}
        cityName={cityName}
        isToday={activeDay === "today"}
      />
    </div>
  );
}
