import Link from "next/link";

const POPULAR = [
  { slug: "new-york", name: "New York", emoji: "🗽" },
  { slug: "london", name: "London", emoji: "🇬🇧" },
  { slug: "tokyo", name: "Tokyo", emoji: "🗼" },
  { slug: "paris", name: "Paris", emoji: "🇫🇷" },
  { slug: "dubai", name: "Dubai", emoji: "🏙️" },
  { slug: "singapore", name: "Singapore", emoji: "🇸🇬" },
  { slug: "sydney", name: "Sydney", emoji: "🇦🇺" },
  { slug: "los-angeles", name: "Los Angeles", emoji: "🌴" },
  { slug: "toronto", name: "Toronto", emoji: "🇨🇦" },
  { slug: "mumbai", name: "Mumbai", emoji: "🇮🇳" },
  { slug: "berlin", name: "Berlin", emoji: "🇩🇪" },
  { slug: "seoul", name: "Seoul", emoji: "🇰🇷" },
];

export default function PopularCities() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-white/50 uppercase tracking-wide text-center">
        Popular Cities
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {POPULAR.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            className="glass rounded-lg px-3 py-2 text-sm hover:bg-white/15 transition-colors"
          >
            {city.emoji} {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
