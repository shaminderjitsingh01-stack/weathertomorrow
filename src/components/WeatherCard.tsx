import {
  DailyForecast,
  getWeatherDescription,
  getWeatherEmoji,
  getWhatToWear,
  getActivitySuggestions,
  generateSummary,
} from "@/lib/weather";

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="glass rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  );
}

export default function WeatherCard({
  tomorrow,
  cityName,
  tomorrowDate,
}: {
  tomorrow: DailyForecast;
  cityName: string;
  tomorrowDate: string;
}) {
  const emoji = getWeatherEmoji(tomorrow.weatherCode);
  const description = getWeatherDescription(tomorrow.weatherCode);
  const summary = generateSummary(tomorrow, cityName);
  const whatToWear = getWhatToWear(
    tomorrow.temperatureMax,
    tomorrow.temperatureMin,
    tomorrow.precipitationProbabilityMax,
    tomorrow.weatherCode
  );
  const activities = getActivitySuggestions(
    tomorrow.temperatureMax,
    tomorrow.precipitationProbabilityMax,
    tomorrow.weatherCode,
    tomorrow.uvIndexMax
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Main weather display */}
      <div className="text-center space-y-2">
        <p className="text-white/70 text-sm font-medium tracking-wide uppercase">
          Tomorrow &middot; {formatDate(tomorrowDate)}
        </p>
        <div className="text-8xl my-4">{emoji}</div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-7xl font-bold tracking-tight">
            {Math.round(tomorrow.temperatureMax)}°
          </span>
          <span className="text-3xl text-white/50 font-light">
            {Math.round(tomorrow.temperatureMin)}°
          </span>
        </div>
        <p className="text-xl text-white/80">{description}</p>
        <p className="text-sm text-white/50">
          Feels like {Math.round(tomorrow.apparentTemperatureMax)}° /{" "}
          {Math.round(tomorrow.apparentTemperatureMin)}°
        </p>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl p-5">
        <p className="text-white/80 text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          label="Rain Chance"
          value={`${tomorrow.precipitationProbabilityMax}%`}
          icon="🌧️"
        />
        <MetricCard
          label="Wind"
          value={`${Math.round(tomorrow.windSpeedMax)} km/h`}
          icon="💨"
        />
        <MetricCard
          label="UV Index"
          value={`${tomorrow.uvIndexMax}`}
          icon="☀️"
        />
        <MetricCard
          label="Rainfall"
          value={`${tomorrow.precipitationSum} mm`}
          icon="💧"
        />
      </div>

      {/* Sunrise/Sunset */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">🌅</span>
          <div>
            <div className="text-xs text-white/60">Sunrise</div>
            <div className="font-semibold">{formatTime(tomorrow.sunrise)}</div>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">🌇</span>
          <div>
            <div className="text-xs text-white/60">Sunset</div>
            <div className="font-semibold">{formatTime(tomorrow.sunset)}</div>
          </div>
        </div>
      </div>

      {/* What to wear */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>👕</span> What to Wear
        </h3>
        <ul className="space-y-1.5">
          {whatToWear.map((item, i) => (
            <li key={i} className="text-sm text-white/70 flex items-start gap-2">
              <span className="text-white/40 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activities.good.length > 0 && (
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>✅</span> Good For
            </h3>
            <ul className="space-y-1.5">
              {activities.good.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-white/70 flex items-start gap-2"
                >
                  <span className="text-green-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {activities.bad.length > 0 && (
          <div className="glass rounded-2xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>❌</span> Not Ideal For
            </h3>
            <ul className="space-y-1.5">
              {activities.bad.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-white/70 flex items-start gap-2"
                >
                  <span className="text-red-400 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
