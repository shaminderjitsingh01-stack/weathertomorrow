import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import GeolocateButton from "@/components/GeolocateButton";
import PopularCities from "@/components/PopularCities";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import Footer from "@/components/Footer";
import { getWeatherByCoords, getWeatherGradient, reverseGeocode } from "@/lib/weather";

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

  return (
    <div className={`min-h-screen ${gradient} transition-colors duration-700`}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Weather Tomorrow
          </a>
          <p className="text-white/60 text-sm mt-1">{cityName}</p>
        </header>

        <div className="mb-6">
          <SearchBar />
        </div>

        <WeatherCard
          tomorrow={weather.tomorrow}
          cityName={cityName}
          tomorrowDate={weather.tomorrow.date}
        />

        <div className="mt-6">
          <HourlyForecast hours={weather.hourly} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Weather Tomorrow
          </h1>
        </header>
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-3 border-white/30 border-t-white/80 rounded-full animate-spin" />
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
      <Suspense fallback={<LoadingState />}>
        <WeatherDisplay
          lat={parseFloat(params.lat!)}
          lon={parseFloat(params.lon!)}
          name={params.name}
        />
      </Suspense>
    );
  }

  // Landing page — no location yet
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-10 pt-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Weather Tomorrow
          </h1>
          <p className="text-white/70 text-lg">
            Tomorrow&apos;s weather. Instantly.
          </p>
        </header>

        <div className="space-y-4">
          <SearchBar />
          <div className="flex justify-center">
            <GeolocateButton />
          </div>
        </div>

        <div className="mt-12">
          <PopularCities />
        </div>

        <Footer />
      </div>
    </div>
  );
}
