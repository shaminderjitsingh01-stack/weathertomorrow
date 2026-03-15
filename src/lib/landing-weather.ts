// Lightweight weather fetch for landing page components
// Uses Open-Meteo BATCH API — single request for all cities

export interface CityWeatherSummary {
  slug: string;
  name: string;
  country: string;
  temp: number;
  tempMin: number;
  weatherCode: number;
  precipitation: number;
  rainChance: number;
}

// Cities to feature on the landing page
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

// Cache for the batch fetch result
let cachedData: CityWeatherSummary[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in ms

// Single batch request for ALL landing page cities
export async function fetchLandingWeather(
  count?: number
): Promise<CityWeatherSummary[]> {
  const now = Date.now();

  // Return in-memory cache if fresh
  if (cachedData && now - cacheTime < CACHE_TTL) {
    return count ? cachedData.slice(0, count) : cachedData;
  }

  try {
    const lats = LANDING_CITIES.map((c) => c.lat).join(",");
    const lons = LANDING_CITIES.map((c) => c.lon).join(",");

    const params = new URLSearchParams({
      latitude: lats,
      longitude: lons,
      daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,precipitation_probability_max",
      timezone: "auto",
      forecast_days: "1",
    });

    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return cachedData || [];

    const data = await res.json();

    // Open-Meteo returns an array when multiple locations are requested
    const results: CityWeatherSummary[] = [];

    if (Array.isArray(data)) {
      // Multiple locations — array of results
      for (let i = 0; i < data.length && i < LANDING_CITIES.length; i++) {
        const d = data[i];
        if (!d?.daily) continue;
        results.push({
          slug: LANDING_CITIES[i].slug,
          name: LANDING_CITIES[i].name,
          country: LANDING_CITIES[i].country,
          temp: Math.round(d.daily.temperature_2m_max[0]),
          tempMin: Math.round(d.daily.temperature_2m_min[0]),
          weatherCode: d.daily.weather_code[0],
          precipitation: d.daily.precipitation_sum[0] ?? 0,
          rainChance: d.daily.precipitation_probability_max[0] ?? 0,
        });
      }
    } else if (data?.daily) {
      // Single location fallback
      results.push({
        slug: LANDING_CITIES[0].slug,
        name: LANDING_CITIES[0].name,
        country: LANDING_CITIES[0].country,
        temp: Math.round(data.daily.temperature_2m_max[0]),
        tempMin: Math.round(data.daily.temperature_2m_min[0]),
        weatherCode: data.daily.weather_code[0],
        precipitation: data.daily.precipitation_sum[0] ?? 0,
        rainChance: data.daily.precipitation_probability_max[0] ?? 0,
      });
    }

    // Cache the results
    cachedData = results;
    cacheTime = now;

    return count ? results.slice(0, count) : results;
  } catch {
    return cachedData || [];
  }
}
