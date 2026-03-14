import Link from "next/link";

const POPULAR = [
  { slug: "new-york", name: "New York" },
  { slug: "london", name: "London" },
  { slug: "tokyo", name: "Tokyo" },
  { slug: "paris", name: "Paris" },
  { slug: "dubai", name: "Dubai" },
  { slug: "singapore", name: "Singapore" },
  { slug: "sydney", name: "Sydney" },
  { slug: "los-angeles", name: "Los Angeles" },
  { slug: "toronto", name: "Toronto" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "berlin", name: "Berlin" },
  { slug: "seoul", name: "Seoul" },
];

export default function PopularCities() {
  return (
    <div className="space-y-4">
      <p className="section-label text-center">Popular Cities</p>
      <div className="flex flex-wrap justify-center gap-2">
        {POPULAR.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            className="card-interactive rounded-lg px-3.5 py-2 text-sm font-medium text-white/70"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
