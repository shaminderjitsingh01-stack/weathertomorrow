import { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import TodayComparison from "@/components/TodayComparison";
import PopularCities from "@/components/PopularCities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWeatherByCoords, getWeatherGradient, searchLocations } from "@/lib/weather";
import { getCityBySlug, getCityLabel, slugToQuery, CityData } from "@/lib/cities";
import SubscribeForm from "@/components/SubscribeForm";
import { generateWeatherJsonLd } from "@/lib/structured-data";

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

  const title = `Weather Tomorrow in ${city.name}, ${city.country}`;
  const description = `Tomorrow's weather forecast for ${city.name}, ${city.country}. Temperature, rain chance, wind, UV index, hourly forecast, and what to wear. Updated every hour.`;

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
        <div className="max-w-lg mx-auto px-4 py-4">
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

  return (
    <div className={`min-h-screen ${gradient}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-lg mx-auto px-4 py-4">
        <Header subtitle={label} lastUpdated={lastUpdated} />

        <div className="mb-5">
          <SearchBar />
        </div>

        <WeatherCard
          today={weather.today}
          tomorrow={weather.tomorrow}
          cityName={city.name}
          tomorrowDate={weather.tomorrow.date}
        />

        <div className="mt-3">
          <TodayComparison today={weather.today} tomorrow={weather.tomorrow} />
        </div>

        <div className="mt-3">
          <HourlyForecast hours={weather.hourlyTomorrow} />
        </div>

        {/* Newsletter subscribe */}
        <div className="mt-3">
          <SubscribeForm cityName={city.name} timezone={city.timezone} />
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
