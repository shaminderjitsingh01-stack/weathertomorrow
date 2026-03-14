import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Weather Tomorrow.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Weather Tomorrow
          </a>
        </header>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h1 className="text-xl font-bold">Privacy Policy</h1>
          <p className="text-xs text-white/50">Last updated: March 2026</p>

          <div className="text-sm text-white/70 space-y-3 leading-relaxed">
            <p>
              Weather Tomorrow (&quot;we&quot;, &quot;us&quot;) is committed to
              protecting your privacy.
            </p>

            <h2 className="text-base font-semibold text-white/90 pt-1">
              Information We Collect
            </h2>
            <p>
              <strong>Location data:</strong> If you choose to use the &quot;Use
              My Location&quot; feature, your browser will ask for permission to
              share your location. This data is used solely to fetch your local
              weather forecast and is not stored on our servers.
            </p>
            <p>
              <strong>Analytics:</strong> We may use privacy-respecting
              analytics to understand site usage. No personally identifiable
              information is collected.
            </p>

            <h2 className="text-base font-semibold text-white/90 pt-1">
              Cookies
            </h2>
            <p>
              We do not use tracking cookies. Third-party ad providers may use
              cookies for ad personalization — you can opt out via your browser
              settings.
            </p>

            <h2 className="text-base font-semibold text-white/90 pt-1">
              Third-Party Services
            </h2>
            <p>
              Weather data is provided by Open-Meteo. Geocoding uses
              OpenStreetMap Nominatim. These services have their own privacy
              policies.
            </p>

            <h2 className="text-base font-semibold text-white/90 pt-1">
              Contact
            </h2>
            <p>
              Questions? Email us at privacy@weathertomorrow.app.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
