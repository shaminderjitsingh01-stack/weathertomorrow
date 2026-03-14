// Weather API integration using Open-Meteo (free, no API key required)
// https://open-meteo.com/

export interface HourlyForecast {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  visibility: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  sunrise: string;
  sunset: string;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windGustMax: number;
  weatherCode: number;
  uvIndexMax: number;
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  tomorrow: DailyForecast;
  hourly: HourlyForecast[];
}

export async function getWeatherByCoords(
  lat: number,
  lon: number,
  timezone: string = "auto"
): Promise<{ tomorrow: DailyForecast; hourly: HourlyForecast[] }> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "weather_code",
      "uv_index_max",
    ].join(","),
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
      "visibility",
      "is_day",
    ].join(","),
    timezone,
    forecast_days: "2",
  });

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }

  const data = await res.json();

  // Tomorrow is index 1
  const tomorrow: DailyForecast = {
    date: data.daily.time[1],
    temperatureMax: data.daily.temperature_2m_max[1],
    temperatureMin: data.daily.temperature_2m_min[1],
    apparentTemperatureMax: data.daily.apparent_temperature_max[1],
    apparentTemperatureMin: data.daily.apparent_temperature_min[1],
    sunrise: data.daily.sunrise[1],
    sunset: data.daily.sunset[1],
    precipitationSum: data.daily.precipitation_sum[1],
    precipitationProbabilityMax: data.daily.precipitation_probability_max[1],
    windSpeedMax: data.daily.wind_speed_10m_max[1],
    windGustMax: data.daily.wind_gusts_10m_max[1],
    weatherCode: data.daily.weather_code[1],
    uvIndexMax: data.daily.uv_index_max[1],
  };

  // Extract tomorrow's hourly data (hours 24-47)
  const hourly: HourlyForecast[] = [];
  for (let i = 24; i < 48 && i < data.hourly.time.length; i++) {
    hourly.push({
      time: data.hourly.time[i],
      temperature: data.hourly.temperature_2m[i],
      apparentTemperature: data.hourly.apparent_temperature[i],
      humidity: data.hourly.relative_humidity_2m[i],
      precipitationProbability: data.hourly.precipitation_probability[i],
      precipitation: data.hourly.precipitation[i],
      weatherCode: data.hourly.weather_code[i],
      windSpeed: data.hourly.wind_speed_10m[i],
      windDirection: data.hourly.wind_direction_10m[i],
      uvIndex: data.hourly.uv_index[i],
      visibility: data.hourly.visibility[i],
      isDay: data.hourly.is_day[i] === 1,
    });
  }

  return { tomorrow, hourly };
}

// Geocoding using Open-Meteo's geocoding API (also free)
export interface GeoLocation {
  name: string;
  country: string;
  countryCode: string;
  admin1?: string; // state/province
  latitude: number;
  longitude: number;
  population?: number;
  timezone: string;
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en`,
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.results) return [];

  return data.results.map((r: Record<string, unknown>) => ({
    name: r.name as string,
    country: r.country as string,
    countryCode: r.country_code as string,
    admin1: r.admin1 as string | undefined,
    latitude: r.latitude as number,
    longitude: r.longitude as number,
    population: r.population as number | undefined,
    timezone: r.timezone as string,
  }));
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<string> {
  // Use a simple reverse geocode via Open-Meteo geocoding
  // We search nearby and find closest match
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,
    {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "weathertomorrow.app" },
    }
  );

  if (!res.ok) return "Your Location";

  const data = await res.json();
  return (
    data.address?.city ||
    data.address?.town ||
    data.address?.village ||
    data.address?.county ||
    "Your Location"
  );
}

// WMO Weather interpretation codes
// https://open-meteo.com/en/docs
export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] || "Unknown";
}

export function getWeatherEmoji(code: number, isDay: boolean = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 2) return isDay ? "⛅" : "☁️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

export function getWeatherGradient(code: number): string {
  if (code === 0 || code === 1) return "weather-sunny";
  if (code <= 3) return "weather-cloudy";
  if (code <= 48) return "weather-cloudy";
  if (code <= 67) return "weather-rainy";
  if (code <= 86) return "weather-snowy";
  return "weather-rainy"; // thunderstorm
}

export function getWhatToWear(
  tempMax: number,
  tempMin: number,
  rainChance: number,
  weatherCode: number
): string[] {
  const suggestions: string[] = [];

  // Temperature-based
  if (tempMax >= 30) {
    suggestions.push("Light, breathable clothing");
    suggestions.push("Sunscreen & sunglasses");
  } else if (tempMax >= 20) {
    suggestions.push("T-shirt and light layers");
  } else if (tempMax >= 10) {
    suggestions.push("Jacket or sweater");
    if (tempMin < 5) suggestions.push("Warm layers underneath");
  } else if (tempMax >= 0) {
    suggestions.push("Heavy coat and warm layers");
    suggestions.push("Gloves and hat");
  } else {
    suggestions.push("Heavy winter coat");
    suggestions.push("Thermal layers, gloves, scarf, hat");
  }

  // Rain-based
  if (rainChance >= 60) {
    suggestions.push("Umbrella — rain is likely");
  } else if (rainChance >= 30) {
    suggestions.push("Consider an umbrella, just in case");
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 86) {
    suggestions.push("Waterproof boots");
  }

  return suggestions;
}

export function getActivitySuggestions(
  tempMax: number,
  rainChance: number,
  weatherCode: number,
  uvIndex: number
): { good: string[]; bad: string[] } {
  const good: string[] = [];
  const bad: string[] = [];

  const isSunny = weatherCode <= 2;
  const isRainy = rainChance >= 50;
  const isSnowy = weatherCode >= 71 && weatherCode <= 86;
  const isComfortable = tempMax >= 15 && tempMax <= 30;

  if (isSunny && isComfortable) {
    good.push("Outdoor dining", "Running", "Cycling", "Picnic");
    bad.push("Indoor activities (enjoy the weather!)");
  } else if (isSunny && tempMax > 30) {
    good.push("Swimming", "Water activities", "Early morning walk");
    bad.push("Midday outdoor exercise", "Extended sun exposure");
  } else if (isRainy) {
    good.push("Museums", "Cafés", "Indoor workout", "Reading");
    bad.push("Hiking", "Beach", "Outdoor sports");
  } else if (isSnowy) {
    good.push("Skiing", "Snowboarding", "Cozy indoor activities");
    bad.push("Driving long distances", "Cycling");
  } else if (tempMax < 5) {
    good.push("Indoor workout", "Hot drinks", "Movies");
    bad.push("Extended outdoor activities");
  } else {
    good.push("Walking", "Sightseeing", "Light outdoor activities");
  }

  if (uvIndex >= 8) {
    bad.push("Prolonged sun exposure without SPF 50+");
  }

  return { good: good.slice(0, 4), bad: bad.slice(0, 3) };
}

export function generateSummary(
  tomorrow: DailyForecast,
  cityName: string
): string {
  const desc = getWeatherDescription(tomorrow.weatherCode).toLowerCase();
  const tempMax = Math.round(tomorrow.temperatureMax);
  const tempMin = Math.round(tomorrow.temperatureMin);

  let summary = `Tomorrow in ${cityName}: ${desc} with a high of ${tempMax}°C and a low of ${tempMin}°C.`;

  if (tomorrow.precipitationProbabilityMax >= 60) {
    summary += ` There's a ${tomorrow.precipitationProbabilityMax}% chance of rain — bring an umbrella.`;
  } else if (tomorrow.precipitationProbabilityMax >= 30) {
    summary += ` There's a small chance of rain (${tomorrow.precipitationProbabilityMax}%), so you might want to carry an umbrella.`;
  }

  if (tomorrow.windSpeedMax > 40) {
    summary += ` Expect strong winds up to ${Math.round(tomorrow.windSpeedMax)} km/h.`;
  }

  if (tomorrow.uvIndexMax >= 8) {
    summary += ` UV index is very high (${tomorrow.uvIndexMax}) — wear sunscreen.`;
  }

  return summary;
}
