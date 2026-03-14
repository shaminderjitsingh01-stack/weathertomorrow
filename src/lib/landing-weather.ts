// Lightweight weather fetch for landing page components
// Uses Open-Meteo API with minimal fields for fast responses

export interface CityWeatherSummary {
  slug: string;
  name: string;
  country: string;
  temp: number; // current temperature (today's max as proxy)
  tempMin: number;
  weatherCode: number;
  precipitation: number; // mm today
  rainChance: number; // percentage
}

// Cities to feature on the landing page ticker & trending
export const LANDING_CITIES = [
  { slug: "new-york", name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
  { slug: "london", name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
  { slug: "tokyo", name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
  { slug: "paris", name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
  { slug: "dubai", name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
  { slug: "singapore", name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198 },
  { slug: "sydney", name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
  { slug: "los-angeles", name: "Los Angeles", country: "US", lat: 34.0522, lon: -118.2437 },
  { slug: "berlin", name: "Berlin", country: "DE", lat: 52.52, lon: 13.405 },
  { slug: "mumbai", name: "Mumbai", country: "IN", lat: 19.076, lon: 72.8777 },
  { slug: "toronto", name: "Toronto", country: "CA", lat: 43.6532, lon: -79.3832 },
  { slug: "seoul", name: "Seoul", country: "KR", lat: 37.5665, lon: 126.978 },
  { slug: "mexico-city", name: "Mexico City", country: "MX", lat: 19.4326, lon: -99.1332 },
  { slug: "cairo", name: "Cairo", country: "EG", lat: 30.0444, lon: 31.2357 },
  { slug: "bangkok", name: "Bangkok", country: "TH", lat: 13.7563, lon: 100.5018 },
  { slug: "sao-paulo", name: "São Paulo", country: "BR", lat: -23.5505, lon: -46.6333 },
  { slug: "moscow", name: "Moscow", country: "RU", lat: 55.7558, lon: 37.6173 },
  { slug: "istanbul", name: "Istanbul", country: "TR", lat: 41.0082, lon: 28.9784 },
  { slug: "miami", name: "Miami", country: "US", lat: 25.7617, lon: -80.1918 },
  { slug: "rome", name: "Rome", country: "IT", lat: 41.9028, lon: 12.4964 },
] as const;

async function fetchCityWeather(
  city: typeof LANDING_CITIES[number]
): Promise<CityWeatherSummary | null> {
  try {
    const params = new URLSearchParams({
      latitude: city.lat.toString(),
      longitude: city.lon.toString(),
      daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,precipitation_probability_max",
      timezone: "auto",
      forecast_days: "1",
    });

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const data = await res.json();

    return {
      slug: city.slug,
      name: city.name,
      country: city.country,
      temp: Math.round(data.daily.temperature_2m_max[0]),
      tempMin: Math.round(data.daily.temperature_2m_min[0]),
      weatherCode: data.daily.weather_code[0],
      precipitation: data.daily.precipitation_sum[0] ?? 0,
      rainChance: data.daily.precipitation_probability_max[0] ?? 0,
    };
  } catch {
    return null;
  }
}

export async function fetchLandingWeather(
  count?: number
): Promise<CityWeatherSummary[]> {
  const cities = count ? LANDING_CITIES.slice(0, count) : LANDING_CITIES;
  const results = await Promise.all(cities.map(fetchCityWeather));
  return results.filter((r): r is CityWeatherSummary => r !== null);
}
