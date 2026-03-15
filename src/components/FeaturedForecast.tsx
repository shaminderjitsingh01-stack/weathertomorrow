import { getWeatherDescription } from "@/lib/weather";
import FeaturedForecastClient from "./FeaturedForecastClient";

// Rotate through major global cities every 2 hours
const SPOTLIGHT_ROTATION = [
  { slug: "sydney", name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
  { slug: "tokyo", name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
  { slug: "singapore", name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198 },
  { slug: "dubai", name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
  { slug: "mumbai", name: "Mumbai", country: "IN", lat: 19.076, lon: 72.8777 },
  { slug: "istanbul", name: "Istanbul", country: "TR", lat: 41.0082, lon: 28.9784 },
  { slug: "london", name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
  { slug: "paris", name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
  { slug: "new-york", name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
  { slug: "los-angeles", name: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437 },
  { slug: "sao-paulo", name: "São Paulo", country: "BR", lat: -23.5505, lon: -46.6333 },
  { slug: "mexico-city", name: "Mexico City", country: "MX", lat: 19.4326, lon: -99.1332 },
];

function getSpotlightCity() {
  const utcHour = new Date().getUTCHours();
  const index = Math.floor(utcHour / 2) % SPOTLIGHT_ROTATION.length;
  return SPOTLIGHT_ROTATION[index];
}

interface DayData {
  temp: number;
  tempMin: number;
  weatherCode: number;
  rainChance: number;
  windSpeed: number;
  uvIndex: number;
  description: string;
}

export default async function FeaturedForecast() {
  const city = getSpotlightCity();

  try {
    const params = new URLSearchParams({
      latitude: city.lat.toString(),
      longitude: city.lon.toString(),
      daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,wind_speed_10m_max,uv_index_max",
      timezone: "auto",
      forecast_days: "2",
    });

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;
    const data = await res.json();

    const today: DayData = {
      temp: Math.round(data.daily.temperature_2m_max[0]),
      tempMin: Math.round(data.daily.temperature_2m_min[0]),
      weatherCode: data.daily.weather_code[0],
      rainChance: data.daily.precipitation_probability_max[0] ?? 0,
      windSpeed: Math.round(data.daily.wind_speed_10m_max?.[0] ?? 0),
      uvIndex: data.daily.uv_index_max?.[0] ?? 0,
      description: getWeatherDescription(data.daily.weather_code[0]),
    };

    const tomorrow: DayData = {
      temp: Math.round(data.daily.temperature_2m_max[1]),
      tempMin: Math.round(data.daily.temperature_2m_min[1]),
      weatherCode: data.daily.weather_code[1],
      rainChance: data.daily.precipitation_probability_max[1] ?? 0,
      windSpeed: Math.round(data.daily.wind_speed_10m_max?.[1] ?? 0),
      uvIndex: data.daily.uv_index_max?.[1] ?? 0,
      description: getWeatherDescription(data.daily.weather_code[1]),
    };

    return (
      <FeaturedForecastClient
        slug={city.slug}
        name={city.name}
        country={city.country}
        today={today}
        tomorrow={tomorrow}
      />
    );
  } catch {
    return null;
  }
}
