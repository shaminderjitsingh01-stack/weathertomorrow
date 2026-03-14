import Link from "next/link";

const REGIONS = [
  {
    label: "Americas",
    cities: [
      { slug: "new-york", name: "New York" },
      { slug: "los-angeles", name: "Los Angeles" },
      { slug: "chicago", name: "Chicago" },
      { slug: "miami", name: "Miami" },
      { slug: "toronto", name: "Toronto" },
      { slug: "mexico-city", name: "Mexico City" },
      { slug: "sao-paulo", name: "São Paulo" },
    ],
  },
  {
    label: "Europe",
    cities: [
      { slug: "london", name: "London" },
      { slug: "paris", name: "Paris" },
      { slug: "berlin", name: "Berlin" },
      { slug: "madrid", name: "Madrid" },
      { slug: "rome", name: "Rome" },
      { slug: "amsterdam", name: "Amsterdam" },
      { slug: "istanbul", name: "Istanbul" },
    ],
  },
  {
    label: "Asia & Oceania",
    cities: [
      { slug: "tokyo", name: "Tokyo" },
      { slug: "singapore", name: "Singapore" },
      { slug: "dubai", name: "Dubai" },
      { slug: "mumbai", name: "Mumbai" },
      { slug: "bangkok", name: "Bangkok" },
      { slug: "seoul", name: "Seoul" },
      { slug: "sydney", name: "Sydney" },
    ],
  },
];

export default function PopularCities() {
  return (
    <div className="space-y-6">
      {REGIONS.map((region) => (
        <div key={region.label}>
          <p className="section-label mb-3 text-center">{region.label}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {region.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="card-interactive rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
