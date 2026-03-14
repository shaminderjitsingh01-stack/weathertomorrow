import { HourlyForecast as HourlyData, getWeatherEmoji } from "@/lib/weather";

export default function HourlyForecast({ hours }: { hours: HourlyData[] }) {
  const formatHour = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span>🕐</span> Hourly Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 hourly-scroll">
        {hours.map((hour, i) => (
          <div
            key={i}
            className="flex-shrink-0 glass-light rounded-xl p-3 min-w-[72px] text-center"
          >
            <div className="text-xs text-white/60 mb-1">
              {formatHour(hour.time)}
            </div>
            <div className="text-xl mb-1">
              {getWeatherEmoji(hour.weatherCode, hour.isDay)}
            </div>
            <div className="text-sm font-semibold">
              {Math.round(hour.temperature)}°
            </div>
            {hour.precipitationProbability > 0 && (
              <div className="text-xs text-blue-300 mt-1">
                {hour.precipitationProbability}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
