import { DailyForecast, getWeatherDescription } from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";

function TempChange({ diff }: { diff: number }) {
  if (Math.abs(diff) <= 1) {
    return <span className="text-white/40 text-xs font-medium">Same as today</span>;
  }
  const isWarmer = diff > 0;
  return (
    <span className={`text-xs font-bold ${isWarmer ? "text-amber-400" : "text-blue-400"}`}>
      {isWarmer ? "↑" : "↓"} {Math.abs(diff)}° {isWarmer ? "warmer" : "cooler"}
    </span>
  );
}

export default function TodayComparison({
  today,
  tomorrow,
}: {
  today: DailyForecast;
  tomorrow: DailyForecast;
}) {
  const diffMax = Math.round(tomorrow.temperatureMax - today.temperatureMax);
  const diffMin = Math.round(tomorrow.temperatureMin - today.temperatureMin);
  const rainDiff = tomorrow.precipitationProbabilityMax - today.precipitationProbabilityMax;

  return (
    <div className="card rounded-2xl p-5">
      <p className="section-label mb-4">Today vs Tomorrow</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Today */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Today</p>
          <div className="flex justify-center">
            <WeatherIcon code={today.weatherCode} size={48} />
          </div>
          <div>
            <span className="text-2xl font-bold">{Math.round(today.temperatureMax)}°</span>
            <span className="text-white/30 ml-1">{Math.round(today.temperatureMin)}°</span>
          </div>
          <p className="text-xs text-white/40">{getWeatherDescription(today.weatherCode)}</p>
          <p className="text-xs text-white/30">Rain: {today.precipitationProbabilityMax}%</p>
        </div>

        {/* Tomorrow */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Tomorrow</p>
          <div className="flex justify-center">
            <WeatherIcon code={tomorrow.weatherCode} size={48} />
          </div>
          <div>
            <span className="text-2xl font-bold">{Math.round(tomorrow.temperatureMax)}°</span>
            <span className="text-white/30 ml-1">{Math.round(tomorrow.temperatureMin)}°</span>
          </div>
          <p className="text-xs text-white/40">{getWeatherDescription(tomorrow.weatherCode)}</p>
          <p className="text-xs text-white/30">Rain: {tomorrow.precipitationProbabilityMax}%</p>
        </div>
      </div>

      {/* Comparison bar */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-center gap-3">
        <TempChange diff={diffMax} />
        {Math.abs(rainDiff) > 10 && (
          <span className="text-xs text-white/30">
            {rainDiff > 0 ? "More" : "Less"} rain likely
          </span>
        )}
        {Math.abs(diffMin) > 3 && diffMin !== diffMax && (
          <span className="text-xs text-white/30">
            Nights {diffMin > 0 ? "warmer" : "cooler"}
          </span>
        )}
      </div>
    </div>
  );
}
