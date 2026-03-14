import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import GeolocateButton from "@/components/GeolocateButton";
import PopularCities from "@/components/PopularCities";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import TodayComparison from "@/components/TodayComparison";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWeatherByCoords, getWeatherGradient, reverseGeocode } from "@/lib/weather";
import { generateWebsiteJsonLd } from "@/lib/structured-data";
import SubscribeForm from "@/components/SubscribeForm";

async function WeatherDisplay({
  lat,
  lon,
  name,
}: {
  lat: number;
  lon: number;
  name?: string;
}) {
  const [weather, cityName] = await Promise.all([
    getWeatherByCoords(lat, lon),
    name ? Promise.resolve(name) : reverseGeocode(lat, lon),
  ]);

  const gradient = getWeatherGradient(weather.tomorrow.weatherCode);
  const now = new Date();
  const lastUpdated = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className={`min-h-screen ${gradient}`}>
      <div className="max-w-lg mx-auto px-4 py-4">
        <Header subtitle={cityName} lastUpdated={lastUpdated} />

        <div className="mb-5">
          <SearchBar />
        </div>

        <WeatherCard
          today={weather.today}
          tomorrow={weather.tomorrow}
          cityName={cityName}
          tomorrowDate={weather.tomorrow.date}
        />

        <div className="mt-3">
          <TodayComparison today={weather.today} tomorrow={weather.tomorrow} />
        </div>

        <div className="mt-3">
          <HourlyForecast hours={weather.hourlyTomorrow} />
        </div>

        <div className="mt-3">
          <SubscribeForm cityName={cityName} timezone="auto" />
        </div>

        <Footer />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-4">
        <Header />
        <div className="space-y-3 mt-8">
          <div className="card-elevated rounded-3xl p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="skeleton w-24 h-3" />
              <div className="skeleton w-28 h-28 rounded-full" />
              <div className="skeleton w-32 h-16" />
              <div className="skeleton w-40 h-4" />
            </div>
          </div>
          <div className="card rounded-2xl p-5">
            <div className="skeleton w-20 h-3 mb-3" />
            <div className="skeleton w-full h-12" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-metric rounded-2xl p-4">
                <div className="skeleton w-16 h-3 mb-3" />
                <div className="skeleton w-12 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lat?: string; lon?: string; name?: string }>;
}) {
  const params = await searchParams;
  const hasCoords = params.lat && params.lon;

  if (hasCoords) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <WeatherDisplay
          lat={parseFloat(params.lat!)}
          lon={parseFloat(params.lon!)}
          name={params.name}
        />
      </Suspense>
    );
  }

  const jsonLd = generateWebsiteJsonLd();

  return (
    <div className="min-h-screen weather-default">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-lg mx-auto px-4 py-4">
        <Header isLanding />

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="trust-badge rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live Data
          </div>
          <span className="text-[10px] text-white/20 font-semibold">Updated hourly</span>
        </div>

        <div className="space-y-4">
          <SearchBar />
          <div className="flex justify-center">
            <GeolocateButton />
          </div>
        </div>

        <div className="mt-14">
          <PopularCities />
        </div>

        <Footer />
      </div>
    </div>
  );
}
