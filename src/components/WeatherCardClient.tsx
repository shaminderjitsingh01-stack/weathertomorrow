"use client";

import {
  DailyForecast,
  getWeatherDescription,
  getWhatToWear,
  getActivitySuggestions,
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
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-white/40">{icon}</span>
        <span className="section-label">{label}</span>
      </div>
      <div className="text-2xl font-extrabold tracking-tight">{value}</div>
      {sublabel && (
        <div className="text-[11px] text-white/35 mt-1 leading-tight">{sublabel}</div>
      )}
    </div>
  );
}

function SvgIcon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function WeatherCardClient({
  day,
  compare,
  cityName,
  isToday,
}: {
  day: DailyForecast;
  compare: DailyForecast;
  cityName: string;
  isToday: boolean;
}) {
  const description = getWeatherDescription(day.weatherCode);
  const tempDiff = Math.round(day.temperatureMax - compare.temperatureMax);

  const whatToWear = getWhatToWear(
    day.temperatureMax,
    day.temperatureMin,
    day.precipitationProbabilityMax,
    day.weatherCode
  );

  const activities = getActivitySuggestions(
    day.temperatureMax,
    day.precipitationProbabilityMax,
    day.weatherCode,
    day.uvIndexMax
  );

  // Summary
  const desc = getWeatherDescription(day.weatherCode).toLowerCase();
  const tMax = Math.round(day.temperatureMax);
  const tMin = Math.round(day.temperatureMin);
  const dayLabel = isToday ? "Today" : "Tomorrow";
  const compareLabel = isToday ? "tomorrow" : "today";

  let summary = `${dayLabel} in ${cityName}: ${desc} with a high of ${tMax}°C and a low of ${tMin}°C.`;
  if (Math.abs(tempDiff) > 1) {
    const dir = isToday
      ? tempDiff > 0 ? `${Math.abs(tempDiff)}° warmer than tomorrow` : `${Math.abs(tempDiff)}° cooler than tomorrow`
      : tempDiff > 0 ? `${Math.abs(tempDiff)}° warmer than today` : `${Math.abs(tempDiff)}° cooler than today`;
    summary += ` That's ${dir}.`;
  }
  if (day.precipitationProbabilityMax >= 60) {
    summary += ` Rain is likely (${day.precipitationProbabilityMax}%) — bring an umbrella.`;
  }

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
    <div className="space-y-3">
      {/* Main temperature */}
      <div className="card-elevated rounded-3xl px-6 py-8 text-center">
        <p className="section-label mb-5">{formatDate(day.date)}</p>

        <div className="flex justify-center mb-3">
          <WeatherIcon code={day.weatherCode} size={110} />
        </div>

        <div className="flex items-baseline justify-center gap-2 mb-1">
          <span className="text-[5.5rem] font-extrabold tracking-tighter leading-none">
            {Math.round(day.temperatureMax)}°
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-2xl font-semibold text-white/35">
              {Math.round(day.temperatureMin)}°
            </span>
            <span className="text-[10px] text-white/25 font-semibold uppercase tracking-wider">Low</span>
          </div>
        </div>

        <p className="text-lg font-semibold text-white/85 mb-1">{description}</p>

        <div className="flex items-center justify-center gap-3 text-sm text-white/35">
          <span>Feels {Math.round(day.apparentTemperatureMax)}°/{Math.round(day.apparentTemperatureMin)}°</span>
          {Math.abs(tempDiff) > 1 && (
            <>
              <span className="text-white/15">|</span>
              <span className={tempDiff > 0 ? "text-amber-400/70" : "text-blue-400/70"}>
                {tempDiff > 0 ? "+" : ""}{tempDiff}° vs {compareLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="card rounded-2xl p-5">
        <p className="section-label mb-2">Summary</p>
        <p className="text-[13px] text-white/60 leading-relaxed">{summary}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Rain"
          value={`${day.precipitationProbabilityMax}%`}
          sublabel={day.precipitationSum > 0 ? `${day.precipitationSum} mm expected` : "No rainfall expected"}
          icon={<SvgIcon d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242M16 14v6M8 14v6M12 16v6" />}
        />
        <MetricCard
          label="Wind"
          value={`${Math.round(day.windSpeedMax)} km/h`}
          sublabel={`Gusts up to ${Math.round(day.windGustMax)} km/h`}
          icon={<SvgIcon d="M17.7 7.7a2.5 2.5 0 111.8 4.3H2M9.6 4.6A2 2 0 1111 8H2M12.6 19.4A2 2 0 1014 16H2" />}
        />
        <MetricCard
          label="UV Index"
          value={day.uvIndexMax.toFixed(1)}
          sublabel={
            day.uvIndexMax >= 11 ? "Extreme — avoid midday sun"
            : day.uvIndexMax >= 8 ? "Very high — SPF 50+ essential"
            : day.uvIndexMax >= 6 ? "High — sunscreen recommended"
            : day.uvIndexMax >= 3 ? "Moderate — some protection"
            : "Low — no protection needed"
          }
          icon={<SvgIcon d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />}
        />
        <MetricCard
          label="Rainfall"
          value={`${day.precipitationSum} mm`}
          sublabel={
            day.precipitationSum > 20 ? "Very heavy rainfall"
            : day.precipitationSum > 10 ? "Heavy rainfall"
            : day.precipitationSum > 2 ? "Light to moderate"
            : "Little to none"
          }
          icon={<SvgIcon d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />}
        />
      </div>

      {/* Sun */}
      <div className="card rounded-2xl p-5">
        <p className="section-label mb-4">Sun</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">Sunrise</div>
              <div className="font-bold text-lg tracking-tight">{formatTime(day.sunrise)}</div>
            </div>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-px bg-gradient-to-r from-amber-500/20 via-white/10 to-orange-500/20" />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider text-right">Sunset</div>
              <div className="font-bold text-lg tracking-tight">{formatTime(day.sunset)}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10V2M4.93 10.93l1.41-1.41M2 18h4M18 18h4M19.07 10.93l-1.41-1.41" />
                <path d="M3 18h18" />
                <path d="M12 18a6 6 0 010-12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* What to wear */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30">
            <path d="M20.38 3.46L16 2 12 3.5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="section-label">What to Wear</span>
        </div>
        <div className="space-y-2">
          {whatToWear.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-[13px] text-white/60">
              <div className="w-1 h-1 rounded-full bg-blue-400/50 flex-shrink-0 mt-2" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      {(activities.good.length > 0 || activities.bad.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activities.good.length > 0 && (
            <div className="card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="section-label">Good For</span>
              </div>
              <div className="space-y-2">
                {activities.good.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-white/60">
                    <div className="w-1 h-1 rounded-full bg-emerald-400/50 flex-shrink-0 mt-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activities.bad.length > 0 && (
            <div className="card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                </div>
                <span className="section-label">Not Ideal</span>
              </div>
              <div className="space-y-2">
                {activities.bad.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-white/60">
                    <div className="w-1 h-1 rounded-full bg-rose-400/50 flex-shrink-0 mt-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
