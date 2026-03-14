import { DailyForecast, getWeatherDescription, getWhatToWear, getActivitySuggestions } from "./weather";

// Generate weather digest HTML for email
// forecastType: "today" shows today's weather, "tomorrow" shows tomorrow's
// preferencesUrl: optional link to subscriber preferences page
export function generateWeatherEmailHtml(
  cityName: string,
  country: string,
  today: DailyForecast,
  tomorrow: DailyForecast,
  forecastType: "today" | "tomorrow" = "tomorrow",
  preferencesUrl?: string
): string {
  const isToday = forecastType === "today";
  const primary = isToday ? today : tomorrow;
  const compare = isToday ? tomorrow : today;
  const dayLabel = isToday ? "Today" : "Tomorrow";
  const compareLabel = isToday ? "tomorrow" : "today";
  const headerLabel = isToday ? "Weather Today" : "Weather Tomorrow";

  const description = getWeatherDescription(primary.weatherCode);
  const tempMax = Math.round(primary.temperatureMax);
  const tempMin = Math.round(primary.temperatureMin);
  const compareMax = Math.round(compare.temperatureMax);
  const diff = tempMax - compareMax;

  const whatToWear = getWhatToWear(
    primary.temperatureMax,
    primary.temperatureMin,
    primary.precipitationProbabilityMax,
    primary.weatherCode
  );

  const activities = getActivitySuggestions(
    primary.temperatureMax,
    primary.precipitationProbabilityMax,
    primary.weatherCode,
    primary.uvIndexMax
  );

  const sunrise = new Date(primary.sunrise).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const sunset = new Date(primary.sunset).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = new Date(primary.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const diffText =
    Math.abs(diff) <= 1
      ? `Same as ${compareLabel}`
      : diff > 0
        ? `${diff}° warmer than ${compareLabel}`
        : `${Math.abs(diff)}° cooler than ${compareLabel}`;

  const emoji = getWeatherEmoji(primary.weatherCode);
  const accentColor = isToday ? "#0891b2" : "#1d4ed8";
  const activitiesLabel = isToday ? `Good For ${dayLabel}` : `Good For ${dayLabel}`;

  return `
<div style="max-width:480px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a2e;line-height:1.6;">

  <!-- Header -->
  <div style="text-align:center;padding:24px 0 8px;">
    <div style="font-size:13px;color:#888;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">
      ${headerLabel} &middot; ${cityName}
    </div>
    <div style="font-size:12px;color:#aaa;margin-top:4px;">
      ${formattedDate}
    </div>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#e0e0e0,transparent);margin:0 24px;"></div>

  <!-- Main Weather -->
  <div style="text-align:center;padding:28px 24px 20px;">
    <div style="font-size:48px;margin-bottom:8px;">${emoji}</div>
    <div style="font-size:56px;font-weight:800;letter-spacing:-2px;color:#1a1a2e;line-height:1;">
      ${tempMax}°<span style="font-size:24px;color:#999;font-weight:500;margin-left:6px;">${tempMin}°</span>
    </div>
    <div style="font-size:18px;font-weight:600;color:#444;margin-top:8px;">
      ${description}
    </div>
    <div style="font-size:13px;color:#888;margin-top:6px;">
      Feels like ${Math.round(primary.apparentTemperatureMax)}° / ${Math.round(primary.apparentTemperatureMin)}° &middot; ${diffText}
    </div>
  </div>

  <!-- Compare box -->
  <div style="padding:0 24px 20px;">
    <div style="background:#f0f4ff;border-radius:12px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;">${compareLabel.toUpperCase()}</div>
        <div style="font-size:16px;font-weight:700;color:#1a1a2e;">${compareMax}° / ${Math.round(compare.temperatureMin)}°</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:11px;color:#888;font-weight:600;">${getWeatherDescription(compare.weatherCode)}</div>
        <div style="font-size:13px;color:#888;">Rain: ${compare.precipitationProbabilityMax}%</div>
      </div>
    </div>
  </div>

  <!-- Key Stats -->
  <div style="display:flex;justify-content:space-between;padding:0 24px 20px;gap:8px;">
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Rain</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${primary.precipitationProbabilityMax}%</div>
    </div>
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Wind</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${Math.round(primary.windSpeedMax)}<span style="font-size:12px;color:#888;"> km/h</span></div>
    </div>
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">UV</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${primary.uvIndexMax}</div>
    </div>
  </div>

  <!-- Sun Schedule -->
  <div style="padding:0 24px 20px;">
    <div style="background:#f5f7fa;border-radius:12px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:11px;color:#888;font-weight:600;">SUNRISE</div>
        <div style="font-size:16px;font-weight:700;color:#1a1a2e;">${sunrise}</div>
      </div>
      <div style="width:60px;height:1px;background:#ddd;"></div>
      <div style="text-align:right;">
        <div style="font-size:11px;color:#888;font-weight:600;">SUNSET</div>
        <div style="font-size:16px;font-weight:700;color:#1a1a2e;">${sunset}</div>
      </div>
    </div>
  </div>

  <!-- What to Wear -->
  <div style="padding:0 24px 20px;">
    <div style="font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">What to Wear ${dayLabel}</div>
    ${whatToWear
      .map(
        (item) =>
          `<div style="font-size:14px;color:#444;padding:4px 0;display:flex;align-items:flex-start;gap:8px;">
            <span style="color:${accentColor};font-size:8px;margin-top:6px;">●</span>
            ${item}
          </div>`
      )
      .join("")}
  </div>

  <!-- Activities -->
  ${
    activities.good.length > 0
      ? `
  <div style="padding:0 24px 20px;">
    <div style="font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">${activitiesLabel}</div>
    ${activities.good
      .map(
        (item) =>
          `<div style="font-size:14px;color:#444;padding:4px 0;display:flex;align-items:flex-start;gap:8px;">
            <span style="color:#22c55e;font-size:8px;margin-top:6px;">●</span>
            ${item}
          </div>`
      )
      .join("")}
  </div>`
      : ""
  }

  <!-- CTA -->
  <div style="padding:0 24px 24px;text-align:center;">
    <a href="https://weathertomorrow.app/${cityName.toLowerCase().replace(/\s+/g, "-")}"
       style="display:inline-block;background:${accentColor};color:white;padding:12px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700;">
      View Full Forecast
    </a>
  </div>

  <!-- Share with friends -->
  <div style="padding:0 24px 20px;">
    <div style="background:#f5f7fa;border-radius:12px;padding:16px 18px;text-align:center;">
      <div style="font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Share with Friends</div>
      <div style="font-size:13px;color:#666;margin-bottom:12px;">Know someone in ${cityName}? Share the forecast!</div>
      <div>
        <a href="https://wa.me/?text=${encodeURIComponent(`${headerLabel} in ${cityName}: ${tempMax}\u00B0C, ${description.toLowerCase()}.\nhttps://weathertomorrow.app/${cityName.toLowerCase().replace(/\s+/g, "-")}`)}"
           style="display:inline-block;background:#25D366;color:white;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:700;margin:0 4px;">
          WhatsApp
        </a>
        <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`${headerLabel} in ${cityName}: ${tempMax}\u00B0C, ${description.toLowerCase()}`)}&url=${encodeURIComponent(`https://weathertomorrow.app/${cityName.toLowerCase().replace(/\s+/g, "-")}`)}"
           style="display:inline-block;background:#1a1a2e;color:white;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:700;margin:0 4px;">
          Post on X
        </a>
      </div>
    </div>
  </div>

  <!-- Preferences -->
  ${preferencesUrl ? `
  <div style="padding:0 24px 20px;text-align:center;">
    <a href="${preferencesUrl}" style="display:inline-block;background:#f5f7fa;color:#444;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;border:1px solid #e2e8f0;">
      Change city, time, or forecast type
    </a>
  </div>` : ""}

  <!-- Footer -->
  <div style="text-align:center;padding:16px 24px;border-top:1px solid #eee;">
    <div style="font-size:11px;color:#bbb;">
      weathertomorrow.app &middot; ${cityName}, ${country}
    </div>
  </div>

</div>`;
}

function getWeatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

// Generate email subject line
export function generateSubjectLine(
  cityName: string,
  day: DailyForecast,
  forecastType: "today" | "tomorrow" = "tomorrow"
): string {
  const tempMax = Math.round(day.temperatureMax);
  const desc = getWeatherDescription(day.weatherCode);
  const label = forecastType === "today" ? "today" : "tomorrow";

  if (day.precipitationProbabilityMax >= 70) {
    return `🌧️ Rain likely ${label} in ${cityName} — ${tempMax}°C`;
  }

  if (day.weatherCode >= 95) {
    return `⛈️ Thunderstorm warning for ${cityName} ${label}`;
  }

  if ((day.weatherCode >= 71 && day.weatherCode <= 77) || (day.weatherCode >= 85 && day.weatherCode <= 86)) {
    return `🌨️ Snow expected ${label} in ${cityName} — ${tempMax}°C`;
  }

  if (day.uvIndexMax >= 8) {
    return `☀️ High UV ${label} in ${cityName} — ${tempMax}°C, ${desc.toLowerCase()}`;
  }

  const prefix = forecastType === "today" ? "Today" : "Tomorrow";
  return `${getWeatherEmoji(day.weatherCode)} ${prefix} in ${cityName}: ${tempMax}°C, ${desc.toLowerCase()}`;
}
