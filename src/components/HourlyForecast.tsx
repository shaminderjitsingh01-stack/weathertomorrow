import { HourlyForecast as HourlyData } from "@/lib/weather";
import { WeatherIconSmall } from "./WeatherIcon";

export default function HourlyForecast({ hours }: { hours: HourlyData[] }) {
  const formatHour = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  // Find temperature range for visual indicator
  const temps = hours.map((h) => Math.round(h.temperature));
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <div className="card rounded-2xl p-5">
      <p className="section-label mb-4">Hourly Forecast</p>
      <div className="flex gap-1.5 overflow-x-auto pb-2 hourly-scroll">
        {hours.map((hour, i) => {
          const temp = Math.round(hour.temperature);
          const barHeight = 4 + ((temp - minTemp) / range) * 16;

          return (
            <div
              key={i}
              className="flex-shrink-0 card-metric rounded-xl p-2.5 min-w-[62px] text-center flex flex-col items-center"
            >
              <div className="text-[10px] font-semibold text-white/30 mb-2">
                {formatHour(hour.time)}
              </div>
              <div className="mb-1.5">
                <WeatherIconSmall code={hour.weatherCode} isDay={hour.isDay} />
              </div>
              <div className="text-sm font-bold mb-1">{temp}°</div>
              {/* Temperature bar */}
              <div className="w-4 rounded-full overflow-hidden bg-white/5 mb-1" style={{ height: "20px" }}>
                <div
                  className="w-full rounded-full bg-gradient-to-t from-blue-500/40 to-amber-400/40"
                  style={{ height: `${barHeight}px`, marginTop: `${20 - barHeight}px` }}
                />
              </div>
              {hour.precipitationProbability > 0 && (
                <div className="text-[10px] text-blue-400/80 font-semibold mt-0.5">
                  {hour.precipitationProbability}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
