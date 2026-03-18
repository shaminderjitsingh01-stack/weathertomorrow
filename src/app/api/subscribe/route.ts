import { NextRequest, NextResponse } from "next/server";
import { createSubscriber } from "@/lib/beehiiv";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, city, timezone, sendHour, forecastType } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        { error: "City is required" },
        { status: 400 }
      );
    }

    // Spam validation
    const cityTrimmed = city.trim();
    const isGibberish =
      cityTrimmed.length > 50 ||
      cityTrimmed.length < 2 ||
      /[A-Z]{4,}/.test(cityTrimmed) ||
      /[^a-zA-Z\s\-'.áàâãäéèêëíìîïóòôõöúùûüñçÀ-ÿ]/.test(cityTrimmed) ||
      // No spaces in a long name = likely gibberish
      (cityTrimmed.length > 12 && !cityTrimmed.includes(" ") && !cityTrimmed.includes("-")) ||
      // 4+ consonants in a row = not a real word
      /[bcdfghjklmnpqrstvwxyz]{4,}/i.test(cityTrimmed) ||
      // Mixed case pattern like "uiBvpxw" — real cities don't do this
      /[a-z][A-Z][a-z][A-Z]/.test(cityTrimmed);
    if (isGibberish) {
      return NextResponse.json(
        { error: "Please enter a valid city name" },
        { status: 400 }
      );
    }

    const result = await createSubscriber(
      email,
      city,
      timezone || "UTC",
      sendHour ?? 20,
      forecastType || "tomorrow"
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
