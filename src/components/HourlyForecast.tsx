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

  return (
    <div className="card rounded-2xl p-5">
      <p className="section-label mb-4">Hourly Forecast</p>
      <div className="flex gap-2 overflow-x-auto pb-2 hourly-scroll">
        {hours.map((hour, i) => (
          <div
            key={i}
            className="flex-shrink-0 card-metric rounded-xl p-3 min-w-[68px] text-center"
          >
            <div className="text-[10px] font-medium text-white/40 mb-2">
              {formatHour(hour.time)}
            </div>
            <div className="flex justify-center mb-2">
              <WeatherIconSmall code={hour.weatherCode} isDay={hour.isDay} />
            </div>
            <div className="text-sm font-bold">
              {Math.round(hour.temperature)}°
            </div>
            {hour.precipitationProbability > 0 && (
              <div className="text-[10px] text-blue-400 font-medium mt-1">
                {hour.precipitationProbability}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
