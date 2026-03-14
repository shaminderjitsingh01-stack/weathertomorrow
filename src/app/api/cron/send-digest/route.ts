import { NextRequest, NextResponse } from "next/server";
import {
  getAllSubscribers,
  getSubscribersForCurrentHour,
  groupSubscribersByCity,
  createAndSendPost,
} from "@/lib/beehiiv";
import { getWeatherByCoords, searchLocations } from "@/lib/weather";
import { getCityBySlug } from "@/lib/cities";
import { generateWeatherEmailHtml, generateSubjectLine } from "@/lib/email-template";

export const maxDuration = 300; // 5 min timeout for Vercel Pro

export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Get all active subscribers
    const allSubscribers = await getAllSubscribers();

    if (allSubscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers", sent: 0 });
    }

    // 2. Filter to subscribers whose send_hour matches current hour in their timezone
    const eligibleSubscribers = getSubscribersForCurrentHour(allSubscribers);

    if (eligibleSubscribers.length === 0) {
      return NextResponse.json({
        message: "No subscribers scheduled for this hour",
        totalSubscribers: allSubscribers.length,
        sent: 0,
      });
    }

    // 3. Group by city
    const cityGroups = groupSubscribersByCity(eligibleSubscribers);

    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    // 4. For each city, fetch weather and send digest
    for (const [cityName, cityInfo] of cityGroups) {
      try {
        // Resolve city coordinates
        const slug = cityName.toLowerCase().replace(/\s+/g, "-");
        let lat: number, lon: number, tz: string, country: string;

        const curated = getCityBySlug(slug);
        if (curated) {
          lat = curated.latitude;
          lon = curated.longitude;
          tz = curated.timezone;
          country = curated.country;
        } else {
          // Dynamic geocoding
          const results = await searchLocations(cityName);
          if (results.length === 0) {
            errors.push(`Could not geocode: ${cityName}`);
            failed++;
            continue;
          }
          lat = results[0].latitude;
          lon = results[0].longitude;
          tz = results[0].timezone;
          country = results[0].country;
        }

        // Fetch weather
        const weather = await getWeatherByCoords(lat, lon, tz);

        // Generate email
        const html = generateWeatherEmailHtml(
          cityName,
          country,
          weather.today,
          weather.tomorrow,
          weather.tomorrow.date
        );

        const subject = generateSubjectLine(cityName, weather.tomorrow);

        // Send via Beehiiv
        const result = await createAndSendPost(
          subject,
          html,
          `${Math.round(weather.tomorrow.temperatureMax)}° tomorrow in ${cityName}`
        );

        if (result.success) {
          sent++;
        } else {
          errors.push(`Failed to send for ${cityName}: ${result.error}`);
          failed++;
        }

        // Rate limit: wait 1s between cities to avoid API limits
        await new Promise((r) => setTimeout(r, 1000));
      } catch (err) {
        errors.push(`Error for ${cityName}: ${err instanceof Error ? err.message : "Unknown"}`);
        failed++;
      }
    }

    return NextResponse.json({
      message: "Digest complete",
      totalSubscribers: allSubscribers.length,
      eligibleThisHour: eligibleSubscribers.length,
      citiesProcessed: cityGroups.size,
      sent,
      failed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
