import { NextRequest, NextResponse } from "next/server";
import { createSubscriber } from "@/lib/beehiiv";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, city, timezone, sendHour } = body;

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

    const result = await createSubscriber(
      email,
      city,
      timezone || "UTC",
      sendHour ?? 20
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
