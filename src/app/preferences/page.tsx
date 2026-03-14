import { Metadata } from "next";
import { verifyEmailToken } from "@/lib/tokens";
import { getSubscriberByEmail } from "@/lib/beehiiv";
import PreferencesForm from "@/components/PreferencesForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Email Preferences",
  description: "Update your Weather Tomorrow newsletter preferences.",
  robots: { index: false, follow: false },
};

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  // Validate required params
  if (!email || !token) {
    return (
      <div className="min-h-screen weather-default">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Header />
          <div className="card-elevated rounded-3xl p-8 text-center mt-8">
            <div className="text-4xl mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-white/30">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h1 className="text-lg font-bold mb-2">Invalid Link</h1>
            <p className="text-sm text-white/40">
              This preferences link is missing required parameters. Please use the link from your newsletter email.
            </p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Verify token
  if (!verifyEmailToken(email, token)) {
    return (
      <div className="min-h-screen weather-default">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Header />
          <div className="card-elevated rounded-3xl p-8 text-center mt-8">
            <div className="text-4xl mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-rose-400/60">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="text-lg font-bold mb-2">Access Denied</h1>
            <p className="text-sm text-white/40">
              This link is invalid or has expired. Please use the latest preferences link from your newsletter email.
            </p>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Fetch subscriber data from Beehiiv
  let city = "";
  let timezone = "UTC";
  let sendHour = 20;
  let forecastType: "today" | "tomorrow" = "tomorrow";

  try {
    const subscriber = await getSubscriberByEmail(email);
    if (subscriber) {
      const cityField = subscriber.custom_fields?.find((f) => f.name === "city");
      const tzField = subscriber.custom_fields?.find((f) => f.name === "timezone");
      const hourField = subscriber.custom_fields?.find((f) => f.name === "send_hour");
      const ftField = subscriber.custom_fields?.find((f) => f.name === "forecast_type");

      city = cityField?.value || "";
      timezone = tzField?.value || "UTC";
      sendHour = hourField?.value ? parseInt(hourField.value, 10) : 20;
      forecastType = (ftField?.value as "today" | "tomorrow") || "tomorrow";
    }
  } catch (err) {
    console.error("Failed to fetch subscriber:", err);
  }

  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Header />
        <div className="mt-8">
          <PreferencesForm
            email={email}
            token={token}
            initialCity={city}
            initialTimezone={timezone}
            initialSendHour={sendHour}
            initialForecastType={forecastType}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
