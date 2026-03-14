import {
  DailyForecast,
  getWeatherDescription,
  getWhatToWear,
  getActivitySuggestions,
  generateSummary,
} from "@/lib/weather";
import WeatherIcon from "./WeatherIcon";

function MetricCard({
  label,
  value,
  sublabel,
  icon,
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card-metric rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white/40">{icon}</span>
        <span className="section-label">{label}</span>
      </div>
      <div className="text-xl font-bold tracking-tight">{value}</div>
      {sublabel && (
        <div className="text-xs text-white/40 mt-0.5">{sublabel}</div>
      )}
    </div>
  );
}

function WindIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1111 8H2" />
      <path d="M12.6 19.4A2 2 0 1014 16H2" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242" />
      <path d="M16 14v6M8 14v6M12 16v6" />
    </svg>
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
    <div className="space-y-4">
      {/* Main temperature display */}
      <div className="card-elevated rounded-3xl p-8 text-center">
        <p className="section-label mb-4">
          Tomorrow &middot; {formatDate(tomorrowDate)}
        </p>

        <div className="flex justify-center mb-4">
          <WeatherIcon code={tomorrow.weatherCode} size={100} />
        </div>

        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="text-8xl font-extrabold tracking-tighter leading-none">
            {Math.round(tomorrow.temperatureMax)}°
          </span>
          <div className="flex flex-col items-start">
            <span className="text-2xl font-medium text-white/40">
              {Math.round(tomorrow.temperatureMin)}°
            </span>
            <span className="text-xs text-white/30">LOW</span>
          </div>
        </div>

        <p className="text-lg font-medium text-white/90 mb-1">{description}</p>
        <p className="text-sm text-white/40">
          Feels like {Math.round(tomorrow.apparentTemperatureMax)}° / {Math.round(tomorrow.apparentTemperatureMin)}°
        </p>
      </div>

      {/* Summary */}
      <div className="card rounded-2xl p-5">
        <p className="section-label mb-2">Forecast Summary</p>
        <p className="text-sm text-white/70 leading-relaxed">{summary}</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Precipitation"
          value={`${tomorrow.precipitationProbabilityMax}%`}
          sublabel={`${tomorrow.precipitationSum} mm expected`}
          icon={<RainIcon />}
        />
        <MetricCard
          label="Wind"
          value={`${Math.round(tomorrow.windSpeedMax)} km/h`}
          sublabel={`Gusts ${Math.round(tomorrow.windGustMax)} km/h`}
          icon={<WindIcon />}
        />
        <MetricCard
          label="UV Index"
          value={`${tomorrow.uvIndexMax}`}
          sublabel={
            tomorrow.uvIndexMax >= 8
              ? "Very high — protection needed"
              : tomorrow.uvIndexMax >= 6
                ? "High — wear sunscreen"
                : tomorrow.uvIndexMax >= 3
                  ? "Moderate"
                  : "Low"
          }
          icon={<SunIcon />}
        />
        <MetricCard
          label="Total Rainfall"
          value={`${tomorrow.precipitationSum} mm`}
          sublabel={
            tomorrow.precipitationSum > 10
              ? "Heavy rainfall expected"
              : tomorrow.precipitationSum > 2
                ? "Light to moderate"
                : "Little to none"
          }
          icon={<DropletIcon />}
        />
      </div>

      {/* Sunrise / Sunset */}
      <div className="card rounded-2xl p-5">
        <p className="section-label mb-3">Sun Schedule</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-white/40">Sunrise</div>
              <div className="font-bold text-lg">{formatTime(tomorrow.sunrise)}</div>
            </div>
          </div>
          <div className="divider flex-1 mx-6" />
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-white/40 text-right">Sunset</div>
              <div className="font-bold text-lg">{formatTime(tomorrow.sunset)}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10V2M4.93 10.93l2.83-2.83M2 18h4M18 18h4M19.07 10.93l-2.83-2.83" />
                <path d="M3 18h18" />
                <path d="M12 18a6 6 0 000-12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* What to wear */}
      <div className="card rounded-2xl p-5">
        <p className="section-label mb-3">What to Wear</p>
        <div className="space-y-2.5">
          {whatToWear.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/70">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activities.good.length > 0 && (
          <div className="card rounded-2xl p-5">
            <p className="section-label mb-3 text-emerald-400/60">Recommended</p>
            <div className="space-y-2.5">
              {activities.good.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        {activities.bad.length > 0 && (
          <div className="card rounded-2xl p-5">
            <p className="section-label mb-3 text-rose-400/60">Not Ideal</p>
            <div className="space-y-2.5">
              {activities.bad.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
