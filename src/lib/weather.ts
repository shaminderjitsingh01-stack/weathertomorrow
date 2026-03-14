// Weather API — Open-Meteo (free, no API key)

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
  today: DailyForecast;
  tomorrow: DailyForecast;
  hourlyTomorrow: HourlyForecast[];
}

export async function getWeatherByCoords(
  lat: number,
  lon: number,
  timezone: string = "auto"
): Promise<WeatherData> {
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

  let data;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      data = await res.json();
      break;
    }

    if (res.status === 429 && attempt < 2) {
      await new Promise((r) => setTimeout(r, (attempt + 1) * 2000));
      continue;
    }

    throw new Error(`Weather API error: ${res.status}`);
  }

  if (!data) {
    throw new Error("Weather API: failed after retries");
  }

  const parseDailyIndex = (i: number): DailyForecast => ({
    date: data.daily.time[i],
    temperatureMax: data.daily.temperature_2m_max[i],
    temperatureMin: data.daily.temperature_2m_min[i],
    apparentTemperatureMax: data.daily.apparent_temperature_max[i],
    apparentTemperatureMin: data.daily.apparent_temperature_min[i],
    sunrise: data.daily.sunrise[i],
    sunset: data.daily.sunset[i],
    precipitationSum: data.daily.precipitation_sum[i],
    precipitationProbabilityMax: data.daily.precipitation_probability_max[i],
    windSpeedMax: data.daily.wind_speed_10m_max[i],
    windGustMax: data.daily.wind_gusts_10m_max[i],
    weatherCode: data.daily.weather_code[i],
    uvIndexMax: data.daily.uv_index_max[i],
  });

  // Today = index 0, Tomorrow = index 1
  const today = parseDailyIndex(0);
  const tomorrow = parseDailyIndex(1);

  // Tomorrow's hourly data (hours 24-47)
  const hourlyTomorrow: HourlyForecast[] = [];
  for (let i = 24; i < 48 && i < data.hourly.time.length; i++) {
    hourlyTomorrow.push({
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

  return { today, tomorrow, hourlyTomorrow };
}

// Geocoding
export interface GeoLocation {
  name: string;
  country: string;
  countryCode: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  population?: number;
  timezone: string;
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=8&language=en`,
    { next: { revalidate: 86400 } }
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

// WMO Weather codes
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

export function getWeatherCondition(code: number): string {
  if (code === 0) return "clear";
  if (code <= 2) return "partly-cloudy";
  if (code === 3) return "overcast";
  if (code <= 48) return "fog";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "rain";
  if (code <= 86) return "snow";
  return "thunderstorm";
}

export function getWeatherGradient(code: number): string {
  if (code === 0 || code === 1) return "weather-sunny";
  if (code <= 3) return "weather-cloudy";
  if (code <= 48) return "weather-cloudy";
  if (code <= 67) return "weather-rainy";
  if (code <= 86) return "weather-snowy";
  return "weather-storm";
}

export function getWhatToWear(
  tempMax: number,
  tempMin: number,
  rainChance: number,
  weatherCode: number
): string[] {
  const suggestions: string[] = [];

  if (tempMax >= 35) {
    suggestions.push("Lightweight, loose-fitting clothes in light colors");
    suggestions.push("Apply SPF 50+ sunscreen before heading out");
    suggestions.push("Wear a wide-brimmed hat and UV-blocking sunglasses");
  } else if (tempMax >= 28) {
    suggestions.push("Light cotton or linen clothing");
    suggestions.push("Sunglasses and sunscreen recommended");
    if (tempMin < 22) suggestions.push("Bring a light layer for the evening");
  } else if (tempMax >= 20) {
    suggestions.push("Comfortable layers — t-shirt with a light jacket");
    if (tempMin < 14) suggestions.push("You'll want a warmer layer by evening");
  } else if (tempMax >= 12) {
    suggestions.push("A proper jacket or fleece — it'll be cool");
    if (tempMin < 6) suggestions.push("Layer up with thermals underneath");
    suggestions.push("Closed-toe shoes recommended");
  } else if (tempMax >= 4) {
    suggestions.push("Heavy coat, scarf, and gloves are essential");
    suggestions.push("Wear insulating layers underneath");
    suggestions.push("Warm, waterproof boots");
  } else {
    suggestions.push("Full winter gear — heavy insulated coat, hat, gloves, scarf");
    suggestions.push("Thermal base layers are a must");
    suggestions.push("Insulated, waterproof boots with good traction");
  }

  if (rainChance >= 70) {
    suggestions.push("Definitely bring an umbrella — rain is very likely");
  } else if (rainChance >= 40) {
    suggestions.push("Pack an umbrella just in case — decent chance of rain");
  }

  if (weatherCode >= 71 && weatherCode <= 86) {
    suggestions.push("Waterproof outer layer and boots with grip for snow");
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
  const isComfortable = tempMax >= 16 && tempMax <= 28;

  if (isSunny && isComfortable) {
    good.push("Outdoor dining and picnics", "Running, cycling, or hiking", "Sightseeing and walking tours", "Parks and outdoor markets");
    bad.push("You'd be missing out staying indoors");
  } else if (isSunny && tempMax > 28) {
    good.push("Swimming and water sports", "Early morning or evening walks", "Air-conditioned museums and malls");
    bad.push("Midday outdoor exercise — heat risk", "Extended direct sun exposure");
  } else if (isRainy) {
    good.push("Museums and art galleries", "Indoor markets and cafés", "Cinema or theatre", "Indoor fitness and yoga");
    bad.push("Hiking and trail running", "Outdoor dining", "Beach activities");
  } else if (isSnowy) {
    good.push("Skiing and snowboarding", "Building a snowman", "Cozy café or bookshop visit");
    bad.push("Long-distance driving", "Outdoor cycling");
  } else if (tempMax < 6) {
    good.push("Indoor attractions and museums", "Hot springs or indoor pools", "Warm cafés and restaurants");
    bad.push("Extended outdoor plans without proper gear");
  } else {
    good.push("Walking and light sightseeing", "Outdoor markets", "Light outdoor exercise");
  }

  if (uvIndex >= 8) {
    bad.push("Prolonged sun exposure without strong sunscreen");
  }

  return { good: good.slice(0, 4), bad: bad.slice(0, 3) };
}

export function generateSummary(
  today: DailyForecast,
  tomorrow: DailyForecast,
  cityName: string
): string {
  const desc = getWeatherDescription(tomorrow.weatherCode).toLowerCase();
  const tempMax = Math.round(tomorrow.temperatureMax);
  const tempMin = Math.round(tomorrow.temperatureMin);
  const todayMax = Math.round(today.temperatureMax);
  const diff = tempMax - todayMax;

  let summary = "";

  // Temperature comparison with today
  if (Math.abs(diff) <= 1) {
    summary = `Tomorrow in ${cityName} will be similar to today — ${desc} with a high of ${tempMax}°C and a low of ${tempMin}°C.`;
  } else if (diff > 0) {
    summary = `Tomorrow in ${cityName} will be ${diff >= 5 ? "significantly " : ""}warmer than today — ${desc} with a high of ${tempMax}°C (${diff > 0 ? "+" : ""}${diff}° from today) and a low of ${tempMin}°C.`;
  } else {
    summary = `Tomorrow in ${cityName} will be ${diff <= -5 ? "noticeably " : ""}cooler than today — ${desc} with a high of ${tempMax}°C (${diff}° from today) and a low of ${tempMin}°C.`;
  }

  if (tomorrow.precipitationProbabilityMax >= 70) {
    summary += ` Rain is very likely (${tomorrow.precipitationProbabilityMax}% chance) — plan accordingly and bring an umbrella.`;
  } else if (tomorrow.precipitationProbabilityMax >= 40) {
    summary += ` There's a reasonable chance of rain (${tomorrow.precipitationProbabilityMax}%), so an umbrella wouldn't hurt.`;
  }

  if (tomorrow.windSpeedMax > 50) {
    summary += ` Strong winds expected, up to ${Math.round(tomorrow.windSpeedMax)} km/h — be careful with loose items.`;
  } else if (tomorrow.windSpeedMax > 35) {
    summary += ` It'll be breezy, with winds reaching ${Math.round(tomorrow.windSpeedMax)} km/h.`;
  }

  if (tomorrow.uvIndexMax >= 8) {
    summary += ` The UV index will be very high (${tomorrow.uvIndexMax}) — sunscreen and shade are important.`;
  }

  return summary;
}
