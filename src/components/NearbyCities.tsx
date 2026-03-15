import Link from "next/link";
import { CITIES, CityData } from "@/lib/cities";

// Haversine distance in km between two lat/lon points
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface NearbyCitiesProps {
  currentCity: CityData;
  currentSlug: string;
}

export default function NearbyCities({
  currentCity,
  currentSlug,
}: NearbyCitiesProps) {
  // Calculate distance from current city to all curated cities
  const citiesWithDistance = Object.entries(CITIES)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, city]) => ({
      slug,
      city,
      distance: haversineDistance(
        currentCity.latitude,
        currentCity.longitude,
        city.latitude,
        city.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8);

  if (citiesWithDistance.length === 0) return null;

  return (
    <div className="card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/30"
        >
          <path
            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="section-label">Nearby Cities</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {citiesWithDistance.map(({ slug, city, distance }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className="card-interactive rounded-xl p-3 group text-center"
          >
            <span className="text-sm font-semibold text-white/70 group-hover:text-white/90 transition-colors block truncate">
              {city.name}
            </span>
            <span className="text-[10px] text-white/30 block truncate">
              {city.country}
            </span>
            <span className="text-[10px] text-white/20 block mt-0.5">
              {distance < 100
                ? `${Math.round(distance)} km`
                : `${Math.round(distance / 10) * 10} km`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
