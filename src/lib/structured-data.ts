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

// FAQ structured data for city weather pages
export function generateFaqJsonLd(
  city: CityData | { name: string; country: string },
  tomorrow: DailyForecast
) {
  const description = getWeatherDescription(tomorrow.weatherCode).toLowerCase();
  const tempMax = Math.round(tomorrow.temperatureMax);
  const tempMin = Math.round(tomorrow.temperatureMin);
  const rainChance = tomorrow.precipitationProbabilityMax;
  const sunrise = tomorrow.sunrise;
  const sunset = tomorrow.sunset;

  // Format sunrise/sunset times (they come as ISO strings like "2026-06-16T05:43")
  const formatTime = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    } catch {
      return iso;
    }
  };

  const questions = [
    {
      question: `What is the weather tomorrow in ${city.name}?`,
      answer: `Tomorrow in ${city.name}, ${city.country} will be ${description} with a high of ${tempMax}°C and a low of ${tempMin}°C. There is a ${rainChance}% chance of precipitation. Wind speeds will reach up to ${Math.round(tomorrow.windSpeedMax)} km/h.`,
    },
    {
      question: `Will it rain tomorrow in ${city.name}?`,
      answer: rainChance >= 70
        ? `Yes, rain is very likely tomorrow in ${city.name} with a ${rainChance}% chance of precipitation. Expected rainfall is approximately ${tomorrow.precipitationSum.toFixed(1)} mm. Bring an umbrella.`
        : rainChance >= 40
        ? `There is a moderate chance of rain tomorrow in ${city.name} (${rainChance}% probability). It would be wise to carry an umbrella just in case.`
        : `Rain is unlikely tomorrow in ${city.name}, with only a ${rainChance}% chance of precipitation. You should be fine without an umbrella.`,
    },
    {
      question: `What should I wear tomorrow in ${city.name}?`,
      answer: tempMax >= 28
        ? `With a high of ${tempMax}°C in ${city.name} tomorrow, wear light, breathable clothing like cotton or linen. Don't forget sunscreen and sunglasses.${rainChance >= 40 ? " Pack an umbrella as there is a chance of rain." : ""}`
        : tempMax >= 20
        ? `Tomorrow in ${city.name} will have a high of ${tempMax}°C. Wear comfortable layers — a t-shirt with a light jacket should work well.${rainChance >= 40 ? " Bring an umbrella just in case." : ""}`
        : tempMax >= 12
        ? `With a high of only ${tempMax}°C in ${city.name} tomorrow, you'll want a proper jacket or fleece. Layer up if the low reaches ${tempMin}°C.${rainChance >= 40 ? " Don't forget your umbrella." : ""}`
        : `Tomorrow will be cold in ${city.name} with a high of ${tempMax}°C and a low of ${tempMin}°C. Wear a heavy coat, scarf, and gloves. Insulating layers underneath are recommended.`,
    },
    {
      question: `What is the temperature tomorrow in ${city.name}?`,
      answer: `Tomorrow's temperature in ${city.name} will range from a low of ${tempMin}°C to a high of ${tempMax}°C. The feels-like temperature will range from ${Math.round(tomorrow.apparentTemperatureMin)}°C to ${Math.round(tomorrow.apparentTemperatureMax)}°C.`,
    },
    {
      question: `What time is sunrise tomorrow in ${city.name}?`,
      answer: `Tomorrow in ${city.name}, sunrise will be at ${formatTime(sunrise)} and sunset at ${formatTime(sunset)}.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// Breadcrumb structured data for city weather pages
export function generateBreadcrumbJsonLd(
  cityName: string,
  slug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://weathertomorrow.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cityName,
        item: `https://weathertomorrow.app/${slug}`,
      },
    ],
  };
}
