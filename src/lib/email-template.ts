import { DailyForecast, getWeatherDescription, getWhatToWear, getActivitySuggestions } from "./weather";

// Generate weather digest HTML for email
export function generateWeatherEmailHtml(
  cityName: string,
  country: string,
  today: DailyForecast,
  tomorrow: DailyForecast,
  tomorrowDate: string
): string {
  const description = getWeatherDescription(tomorrow.weatherCode);
  const tempMax = Math.round(tomorrow.temperatureMax);
  const tempMin = Math.round(tomorrow.temperatureMin);
  const todayMax = Math.round(today.temperatureMax);
  const diff = tempMax - todayMax;

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

  const sunrise = new Date(tomorrow.sunrise).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const sunset = new Date(tomorrow.sunset).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = new Date(tomorrowDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const diffText =
    Math.abs(diff) <= 1
      ? "Same as today"
      : diff > 0
        ? `${diff}° warmer than today`
        : `${Math.abs(diff)}° cooler than today`;

  const emoji = getWeatherEmoji(tomorrow.weatherCode);

  return `
<div style="max-width:480px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a2e;line-height:1.6;">

  <!-- Header -->
  <div style="text-align:center;padding:24px 0 8px;">
    <div style="font-size:13px;color:#888;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">
      Weather Tomorrow &middot; ${cityName}
    </div>
    <div style="font-size:12px;color:#aaa;margin-top:4px;">
      ${formattedDate}
    </div>
  </div>

  <div style="height:1px;background:linear-gradient(90deg,transparent,#e0e0e0,transparent);margin:0 24px;" ></div>

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
      Feels like ${Math.round(tomorrow.apparentTemperatureMax)}° / ${Math.round(tomorrow.apparentTemperatureMin)}° &middot; ${diffText}
    </div>
  </div>

  <!-- Key Stats -->
  <div style="display:flex;justify-content:space-between;padding:0 24px 20px;gap:8px;">
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Rain</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${tomorrow.precipitationProbabilityMax}%</div>
    </div>
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Wind</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${Math.round(tomorrow.windSpeedMax)}<span style="font-size:12px;color:#888;"> km/h</span></div>
    </div>
    <div style="flex:1;background:#f5f7fa;border-radius:12px;padding:14px;text-align:center;">
      <div style="font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">UV</div>
      <div style="font-size:22px;font-weight:800;color:#1a1a2e;margin-top:4px;">${tomorrow.uvIndexMax}</div>
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
    <div style="font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">What to Wear</div>
    ${whatToWear
      .map(
        (item) =>
          `<div style="font-size:14px;color:#444;padding:4px 0;display:flex;align-items:flex-start;gap:8px;">
            <span style="color:#3b82f6;font-size:8px;margin-top:6px;">●</span>
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
    <div style="font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Good For Tomorrow</div>
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
       style="display:inline-block;background:#1d4ed8;color:white;padding:12px 28px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700;">
      View Full Forecast
    </a>
  </div>

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
  tomorrow: DailyForecast
): string {
  const tempMax = Math.round(tomorrow.temperatureMax);
  const desc = getWeatherDescription(tomorrow.weatherCode);

  if (tomorrow.precipitationProbabilityMax >= 70) {
    return `🌧️ Rain likely tomorrow in ${cityName} — ${tempMax}°C`;
  }

  if (tomorrow.weatherCode >= 95) {
    return `⛈️ Thunderstorm warning for ${cityName} tomorrow`;
  }

  if (tomorrow.weatherCode >= 71 && tomorrow.weatherCode <= 86) {
    return `🌨️ Snow expected tomorrow in ${cityName} — ${tempMax}°C`;
  }

  if (tomorrow.uvIndexMax >= 8) {
    return `☀️ High UV tomorrow in ${cityName} — ${tempMax}°C, ${desc.toLowerCase()}`;
  }

  return `${getWeatherEmoji(tomorrow.weatherCode)} Tomorrow in ${cityName}: ${tempMax}°C, ${desc.toLowerCase()}`;
}
