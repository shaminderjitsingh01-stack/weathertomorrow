import { NextRequest, NextResponse } from "next/server";
import {
  getAllSubscribers,
  getSubscribersForCurrentHour,
} from "@/lib/beehiiv";
import { getWeatherByCoords, searchLocations } from "@/lib/weather";
import { getCityBySlug } from "@/lib/cities";
import { generateWeatherEmailHtml, generateSubjectLine } from "@/lib/email-template";
import { sendWeatherEmail } from "@/lib/resend";
import { getPreferencesUrl } from "@/lib/tokens";

export const maxDuration = 300; // 5 min timeout for Vercel Pro

interface CityWeather {
  cityName: string;
  country: string;
  today: Awaited<ReturnType<typeof getWeatherByCoords>>["today"];
  tomorrow: Awaited<ReturnType<typeof getWeatherByCoords>>["tomorrow"];
}

export async function GET(request: NextRequest) {
  // Verify cron secret
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

    // 3. Collect unique cities and fetch weather for each (cache to avoid duplicate fetches)
    const weatherCache = new Map<string, CityWeather>();

    for (const sub of eligibleSubscribers) {
      const cityField = sub.custom_fields?.find((f) => f.name === "city");
      const city = cityField?.value || "Unknown";
      if (city === "Unknown" || weatherCache.has(city)) continue;

      try {
        const slug = city.toLowerCase().replace(/\s+/g, "-");
        let lat: number, lon: number, tz: string, country: string;

        const curated = getCityBySlug(slug);
        if (curated) {
          lat = curated.latitude;
          lon = curated.longitude;
          tz = curated.timezone;
          country = curated.country;
        } else {
          const results = await searchLocations(city);
          if (results.length === 0) continue;
          lat = results[0].latitude;
          lon = results[0].longitude;
          tz = results[0].timezone;
          country = results[0].country;
        }

        const weather = await getWeatherByCoords(lat, lon, tz);
        weatherCache.set(city, {
          cityName: city,
          country,
          today: weather.today,
          tomorrow: weather.tomorrow,
        });

        // Rate limit weather API
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error(`Failed to fetch weather for ${city}:`, err);
      }
    }

    // 4. Send personalized email to each subscriber via Resend
    let sent = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const sub of eligibleSubscribers) {
      const cityField = sub.custom_fields?.find((f) => f.name === "city");
      const ftField = sub.custom_fields?.find((f) => f.name === "forecast_type");

      const city = cityField?.value || "Unknown";
      const forecastType = (ftField?.value as "today" | "tomorrow") || "tomorrow";
      const cityWeather = weatherCache.get(city);

      if (!cityWeather) {
        errors.push(`No weather data for ${sub.email} (${city})`);
        failed++;
        continue;
      }

      try {
        // Generate preferences URL for this subscriber
        const preferencesUrl = getPreferencesUrl(sub.email);

        // Generate personalized email for this subscriber
        const html = generateWeatherEmailHtml(
          cityWeather.cityName,
          cityWeather.country,
          cityWeather.today,
          cityWeather.tomorrow,
          forecastType,
          preferencesUrl
        );

        const primaryDay = forecastType === "today" ? cityWeather.today : cityWeather.tomorrow;
        const subject = generateSubjectLine(cityWeather.cityName, primaryDay, forecastType);

        // Send via Resend
        const result = await sendWeatherEmail(sub.email, subject, html);

        if (result.success) {
          sent++;
        } else {
          errors.push(`${sub.email}: ${result.error}`);
          failed++;
        }
      } catch (err) {
        errors.push(`${sub.email}: ${err instanceof Error ? err.message : "Unknown"}`);
        failed++;
      }
    }

    return NextResponse.json({
      message: "Digest complete",
      totalSubscribers: allSubscribers.length,
      eligibleThisHour: eligibleSubscribers.length,
      citiesFetched: weatherCache.size,
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
