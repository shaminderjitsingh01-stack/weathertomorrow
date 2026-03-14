import { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import PopularCities from "@/components/PopularCities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWeatherByCoords, getWeatherGradient } from "@/lib/weather";
import { getCityBySlug, getCityLabel } from "@/lib/cities";

// Don't pre-render at build time — generate on first request, then cache (ISR)
// This avoids rate-limiting the weather API during build
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Weather Tomorrow in ${city.name} — ${city.country} Forecast`;
  const description = `Get tomorrow's weather forecast for ${city.name}, ${city.country}. Temperature, rain chance, hourly forecast, and what to wear. Updated every hour.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://weathertomorrow.app/${slug}`,
    },
    alternates: {
      canonical: `https://weathertomorrow.app/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const weather = await getWeatherByCoords(
    city.latitude,
    city.longitude,
    city.timezone
  );

  const gradient = getWeatherGradient(weather.tomorrow.weatherCode);
  const label = getCityLabel(city);

  return (
    <div className={`min-h-screen ${gradient} transition-colors duration-700`}>
      <div className="max-w-lg mx-auto px-4 py-6">
        <Header subtitle={label} />

        <div className="mb-6">
          <SearchBar />
        </div>

        <WeatherCard
          tomorrow={weather.tomorrow}
          cityName={city.name}
          tomorrowDate={weather.tomorrow.date}
        />

        <div className="mt-4">
          <HourlyForecast hours={weather.hourly} />
        </div>

        {/* SEO content */}
        <div className="mt-6 card rounded-2xl p-5">
          <h2 className="font-bold mb-2">
            Tomorrow&apos;s Weather in {city.name}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Get the latest weather forecast for tomorrow in {city.name},{" "}
            {city.country}. Our forecast includes temperature highs and lows,
            rain probability, wind speed, UV index, hourly breakdown, and
            personalized suggestions for what to wear and activities. Updated
            every hour.
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
