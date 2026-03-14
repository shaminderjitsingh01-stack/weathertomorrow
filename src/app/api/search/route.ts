import { NextRequest, NextResponse } from "next/server";
import { searchLocations } from "@/lib/weather";
import { CITIES } from "@/lib/cities";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  // First, check our static cities for instant matches
  const lowerQ = q.toLowerCase();
  const staticMatches = Object.entries(CITIES)
    .filter(([, city]) => city.name.toLowerCase().includes(lowerQ))
    .slice(0, 4)
    .map(([slug, city]) => ({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      slug,
    }));

  // Then search the geocoding API for more results
  try {
    const apiResults = await searchLocations(q);
    const apiMapped = apiResults
      .filter(
        (r) =>
          !staticMatches.some(
            (s) =>
              Math.abs(s.latitude - r.latitude) < 0.1 &&
              Math.abs(s.longitude - r.longitude) < 0.1
          )
      )
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        country: r.country,
        admin1: r.admin1,
        latitude: r.latitude,
        longitude: r.longitude,
      }));

    return NextResponse.json([...staticMatches, ...apiMapped].slice(0, 8));
  } catch {
    // If API fails, return static matches only
    return NextResponse.json(staticMatches);
  }
}
