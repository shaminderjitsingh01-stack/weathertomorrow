import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import DayToggle from "@/components/DayToggle";
import HourlyForecast from "@/components/HourlyForecast";
import PopularCities from "@/components/PopularCities";
import NearbyCities from "@/components/NearbyCities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherTicker from "@/components/WeatherTicker";
import { getWeatherByCoords, getWeatherGradient, getWeatherDescription, searchLocations } from "@/lib/weather";
import { getCityBySlug, getCityLabel, slugToQuery, CityData } from "@/lib/cities";
import SubscribeForm from "@/components/SubscribeForm";
import { generateWeatherJsonLd, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/structured-data";

export const dynamicParams = true;
export const revalidate = 3600;

// Resolve a slug to city data — curated list first, then geocode dynamically
async function resolveCity(slug: string): Promise<CityData | null> {
  // Check curated list first
  const curated = getCityBySlug(slug);
  if (curated) return curated;

  // Dynamic geocoding — convert slug to search query
  const query = slugToQuery(slug);
  const results = await searchLocations(query);

  if (results.length === 0) return null;

  const best = results[0];
  return {
    name: best.name,
    country: best.country,
    countryCode: best.countryCode,
    latitude: best.latitude,
    longitude: best.longitude,
    timezone: best.timezone,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await resolveCity(slug);
  if (!city) return {};

  // Fetch weather data to include real temperature and conditions in meta
  let title = `Weather Tomorrow in ${city.name}, ${city.country}`;
  let description = `Tomorrow's weather forecast for ${city.name}, ${city.country}. Temperature, rain chance, wind, UV index, hourly forecast, and what to wear. Updated every hour.`;

  try {
    const weather = await getWeatherByCoords(city.latitude, city.longitude, city.timezone);
    const tomorrow = weather.tomorrow;
    const condition = getWeatherDescription(tomorrow.weatherCode).toLowerCase();
    const tempMax = Math.round(tomorrow.temperatureMax);
    const rainChance = tomorrow.precipitationProbabilityMax;

    // Format tomorrow's date for the title (e.g., "Mon, Jun 16")
    const tomorrowDate = new Date(tomorrow.date + "T12:00:00");
    const dayName = tomorrowDate.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = tomorrowDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    // Format today's date for the description "Updated" line
    const now = new Date();
    const updatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    title = `Weather Tomorrow in ${city.name} — ${dayName}, ${monthDay}`;
    description = `Tomorrow's weather in ${city.name}: ${tempMax}°C, ${condition} with ${rainChance}% rain chance. Hourly forecast, what to wear, and activities. Updated ${updatedDate}.`;
  } catch {
    // Fall back to static description if weather fetch fails
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://weathertomorrow.app/${slug}`,
      images: [`https://weathertomorrow.app/api/og/${slug}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://weathertomorrow.app/api/og/${slug}`],
    },
    alternates: {
      canonical: `https://weathertomorrow.app/${slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;

  let city: CityData | null;
  try {
    city = await resolveCity(slug);
  } catch {
    notFound();
  }

  if (!city) {
    notFound();
  }

  let weather;
  try {
    weather = await getWeatherByCoords(city.latitude, city.longitude, city.timezone);
  } catch {
    // Graceful error state
    return (
      <div className="min-h-screen weather-default">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Header subtitle={getCityLabel(city)} />
          <div className="mb-5">
            <SearchBar />
          </div>
          <div className="card-elevated rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-white/30">
                <path d="M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 012.5 8.242" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12v6M12 22h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2">Forecast Temporarily Unavailable</h2>
            <p className="text-sm text-white/40">
              We&apos;re having trouble fetching weather data for {city.name}. Please try again in a few minutes.
            </p>
          </div>
          <div className="mt-8">
            <PopularCities />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const gradient = getWeatherGradient(weather.tomorrow.weatherCode);
  const label = getCityLabel(city);
  const now = new Date();
  const lastUpdated = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const jsonLd = generateWeatherJsonLd(city, weather.tomorrow);
  const faqJsonLd = generateFaqJsonLd(city, weather.tomorrow);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(city.name, slug);

  return (
    <div className={`min-h-screen ${gradient}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Weather ticker at top */}
      <Suspense fallback={null}>
        <WeatherTicker />
      </Suspense>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <Header subtitle={label} lastUpdated={lastUpdated} />

        <div className="mb-5">
          <SearchBar />
        </div>

        <DayToggle
          today={weather.today}
          tomorrow={weather.tomorrow}
          cityName={city.name}
        />

        {/* Newsletter subscribe — right after weather card, peak engagement */}
        <div className="mt-3">
          <SubscribeForm cityName={city.name} timezone={city.timezone} />
        </div>

        <div className="mt-3">
          <HourlyForecast hours={weather.hourlyTomorrow} />
        </div>

        {/* Nearby cities — internal linking for SEO */}
        <div className="mt-3">
          <NearbyCities currentCity={city} currentSlug={slug} />
        </div>

        {/* SEO content */}
        <div className="mt-4 card rounded-2xl p-5">
          <h2 className="text-sm font-bold mb-2">
            Tomorrow&apos;s Weather in {city.name}
          </h2>
          <p className="text-[12px] text-white/35 leading-relaxed">
            Get the latest weather forecast for tomorrow in {city.name},{" "}
            {city.country}. Our forecast includes temperature highs and lows,
            real-feel temperatures, rain probability, wind speed, UV index, a
            24-hour hourly breakdown, and personalized suggestions for what to
            wear and what activities are best suited for tomorrow&apos;s
            conditions. Forecasts are updated every hour using meteorological
            data from Open-Meteo.
          </p>
        </div>

        <div className="mt-6">
          <PopularCities />
        </div>

        <Footer />
      </div>
    </div>
  );
}
