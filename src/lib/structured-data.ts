import { DailyForecast, getWeatherDescription } from "./weather";
import { CityData } from "./cities";

// JSON-LD structured data for rich Google snippets
export function generateWeatherJsonLd(
  city: CityData | { name: string; country: string; latitude: number; longitude: number },
  tomorrow: DailyForecast
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Weather Tomorrow in ${city.name} — Forecast`,
    description: `Tomorrow's weather forecast for ${city.name}, ${city.country}: ${getWeatherDescription(tomorrow.weatherCode)}, high of ${Math.round(tomorrow.temperatureMax)}°C, low of ${Math.round(tomorrow.temperatureMin)}°C.`,
    url: `https://weathertomorrow.app/${city.name.toLowerCase().replace(/\s+/g, "-")}`,
    mainEntity: {
      "@type": "Place",
      name: city.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.latitude,
        longitude: city.longitude,
      },
    },
    about: {
      "@type": "Weather",
      name: getWeatherDescription(tomorrow.weatherCode),
      description: `High: ${Math.round(tomorrow.temperatureMax)}°C, Low: ${Math.round(tomorrow.temperatureMin)}°C. Precipitation: ${tomorrow.precipitationProbabilityMax}%. Wind: ${Math.round(tomorrow.windSpeedMax)} km/h.`,
    },
    publisher: {
      "@type": "Organization",
      name: "Weather Tomorrow",
      url: "https://weathertomorrow.app",
    },
    dateModified: new Date().toISOString(),
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Weather Tomorrow",
    url: "https://weathertomorrow.app",
    description: "Get tomorrow's weather forecast instantly for any city in the world.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://weathertomorrow.app/{city}",
      "query-input": "required name=city",
    },
  };
}
