import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/tokens";
import { getSubscriberByEmail, updateSubscriberCustomFields } from "@/lib/beehiiv";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, city, timezone, sendHour, forecastType } = body;

    // Validate required fields
    if (!email || !token) {
      return NextResponse.json(
        { error: "Email and token are required." },
        { status: 400 }
      );
    }

    // Verify token
    if (!verifyEmailToken(email, token)) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 403 }
      );
    }

    if (!city || !city.trim()) {
      return NextResponse.json(
        { error: "City is required." },
        { status: 400 }
      );
    }

    // Look up subscriber in Beehiiv
    const subscriber = await getSubscriberByEmail(email);
    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found. Please subscribe first." },
        { status: 404 }
      );
    }

    // Update custom fields
    const result = await updateSubscriberCustomFields(subscriber.id, {
      weather_city: city.trim(),
      timezone: timezone || "UTC",
      send_hour: String(sendHour ?? 20),
      forecast_type: forecastType || "tomorrow",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update preferences." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Preferences update error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
