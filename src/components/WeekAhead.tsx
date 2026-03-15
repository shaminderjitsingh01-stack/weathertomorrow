import { DailyForecast, getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "@/components/WeatherIcon";

export default function WeekAhead({ days }: { days: DailyForecast[] }) {
  if (days.length === 0) return null;

  return (
    <div className="card rounded-2xl p-4">
      <div className="section-label mb-3">Week Ahead</div>
      <div className="flex flex-col gap-2">
        {days.map((day) => {
          const date = new Date(day.date + "T12:00:00");
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const high = Math.round(day.temperatureMax);
          const low = Math.round(day.temperatureMin);
          const rainChance = day.precipitationProbabilityMax;
          const description = getWeatherDescription(day.weatherCode);

          return (
            <div
              key={day.date}
              className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              {/* Day name and date */}
              <div className="w-[72px] shrink-0">
                <div className="text-[13px] font-semibold text-white/90">{dayName}</div>
                <div className="text-[10px] text-white/30">{monthDay}</div>
              </div>

              {/* Weather icon */}
              <div className="shrink-0" title={description}>
                <WeatherIcon code={day.weatherCode} isDay={true} size={30} />
              </div>

              {/* Rain chance */}
              <div className="w-[42px] shrink-0 text-right">
                {rainChance > 0 ? (
                  <span className="text-[11px] font-medium text-blue-400">
                    {rainChance}%
                  </span>
                ) : (
                  <span className="text-[11px] text-white/15">&mdash;</span>
                )}
              </div>

              {/* Temperature bar visual + numbers */}
              <div className="flex-1 flex items-center justify-end gap-2">
                <span className="text-[12px] font-medium text-white/40">
                  {low}°
                </span>
                <div className="w-12 h-1 rounded-full bg-white/[0.06] overflow-hidden hidden sm:block">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400/40 to-amber-400/60"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="text-[13px] font-semibold text-white/90">
                  {high}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
