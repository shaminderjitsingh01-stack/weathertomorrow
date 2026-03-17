import { NextRequest, NextResponse } from "next/server";
import { getSubscriberByEmail, createSubscriber } from "@/lib/beehiiv";
import { getPreferencesUrl } from "@/lib/tokens";
import { sendWeatherEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const { email, city, forecastType, sendHour, timezone } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!city || !city.trim()) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    // Basic spam validation
    const cityTrimmed = city.trim();
    if (
      cityTrimmed.length > 50 ||
      cityTrimmed.length < 2 ||
      /[A-Z]{5,}/.test(cityTrimmed) ||
      /[^a-zA-Z\s\-'.áàâãäéèêëíìîïóòôõöúùûüñçÀ-ÿ]/.test(cityTrimmed)
    ) {
      return NextResponse.json({ error: "Please enter a valid city name" }, { status: 400 });
    }

    // Check if subscriber exists
    const subscriber = await getSubscriberByEmail(email);

    if (!subscriber) {
      // New subscriber — create with their preferences
      await createSubscriber(
        email,
        city.trim(),
        timezone || "UTC",
        sendHour ?? 20,
        forecastType || "tomorrow"
      );
    } else {
      // Existing subscriber — update their preferences with the new values
      const { updateSubscriberCustomFields } = await import("@/lib/beehiiv");
      await updateSubscriberCustomFields(subscriber.id, {
        weather_city: city.trim(),
        timezone: timezone || "UTC",
        send_hour: String(sendHour ?? 20),
        forecast_type: forecastType || "tomorrow",
      });
    }

    // Generate magic link
    const preferencesUrl = getPreferencesUrl(email);

    // Send magic link email
    const html = `
<div style="max-width:480px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a2e;line-height:1.6;">
  <div style="text-align:center;padding:32px 24px 16px;">
    <div style="font-size:14px;color:#888;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">
      Weather Tomorrow
    </div>
  </div>

  <div style="padding:0 24px 24px;text-align:center;">
    <h1 style="font-size:24px;font-weight:800;color:#1a1a2e;margin:0 0 12px;">Your login link</h1>
    <p style="font-size:14px;color:#666;margin:0 0 24px;">
      Click the button below to manage your free Weather Tomorrow subscription. This link expires in 1 hour.
    </p>

    <a href="${preferencesUrl}"
       style="display:inline-block;background:#1d4ed8;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:15px;font-weight:700;">
      Manage my free subscription
    </a>

    <p style="font-size:12px;color:#aaa;margin-top:24px;">
      If you didn't request this link, you can safely ignore this email.
    </p>
  </div>

  <div style="text-align:center;padding:16px 24px;border-top:1px solid #eee;">
    <div style="font-size:11px;color:#bbb;">
      weathertomorrow.app
    </div>
  </div>
</div>`;

    await sendWeatherEmail(
      email,
      "Your Weather Tomorrow login link",
      html
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Magic link error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
