import { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/lib/cities";
import { getAllPosts } from "@/lib/blog";

// Approximate population tiers for sitemap priority
// Higher-population cities get higher priority for Google crawling
const TIER1_CITIES = new Set([
  "new-york", "london", "tokyo", "paris", "dubai", "singapore", "sydney",
  "los-angeles", "chicago", "toronto", "mumbai", "delhi", "shanghai",
  "beijing", "seoul", "istanbul", "moscow", "sao-paulo", "mexico-city",
  "cairo", "bangkok", "hong-kong", "jakarta", "manila", "lagos",
  "buenos-aires", "berlin", "madrid", "rome",
]);

const TIER2_CITIES = new Set([
  "miami", "san-francisco", "seattle", "boston", "atlanta", "houston",
  "phoenix", "dallas", "denver", "vancouver", "montreal", "amsterdam",
  "barcelona", "vienna", "zurich", "munich", "prague", "dublin",
  "stockholm", "copenhagen", "warsaw", "budapest", "athens", "melbourne",
  "rio-de-janeiro", "bogota", "lima", "santiago", "kuala-lumpur",
  "taipei", "osaka", "bangalore", "johannesburg", "nairobi",
  "washington-dc", "las-vegas", "orlando", "san-diego",
]);

function getCityPriority(slug: string): number {
  if (TIER1_CITIES.has(slug)) return 0.9;
  if (TIER2_CITIES.has(slug)) return 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.weathertomorrow.app";

  // Include ALL curated cities with population-based priority
  const allSlugs = getAllCitySlugs();
  const cityPages = allSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: getCityPriority(slug),
  }));

  // Blog posts
  const blogPosts = getAllPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...blogPages,
    ...cityPages,
  ];
}
