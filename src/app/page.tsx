import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import GeolocateButton from "@/components/GeolocateButton";
import PopularCities from "@/components/PopularCities";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import Header from "@/components/Header";
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
      <div className="max-w-lg mx-auto px-4 py-6">
        <Header subtitle={cityName} />

        <div className="mb-6">
          <SearchBar />
        </div>

        <WeatherCard
          tomorrow={weather.tomorrow}
          cityName={cityName}
          tomorrowDate={weather.tomorrow.date}
        />

        <div className="mt-4">
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
      <div className="max-w-lg mx-auto px-4 py-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-3 border-white/20 border-t-white/60 rounded-full animate-spin" />
          <p className="text-sm text-white/30 font-medium">Loading forecast...</p>
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

  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-6">
        <Header isLanding />

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
