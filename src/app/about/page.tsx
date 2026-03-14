import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "About Weather Tomorrow — the simplest way to check tomorrow's weather forecast.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Weather Tomorrow
          </a>
        </header>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h1 className="text-xl font-bold">About Weather Tomorrow</h1>
          <p className="text-sm text-white/70 leading-relaxed">
            Weather Tomorrow is the simplest way to check tomorrow&apos;s
            weather forecast. No clutter, no 10-day forecasts, no radar maps you
            don&apos;t need — just tomorrow&apos;s weather, instantly.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            We believe checking the weather should take seconds, not minutes.
            Open the site, see tomorrow&apos;s forecast, get on with your day.
          </p>

          <h2 className="text-lg font-semibold pt-2">What We Show</h2>
          <ul className="text-sm text-white/70 space-y-1">
            <li>• Temperature (high/low and feels like)</li>
            <li>• Rain probability and expected rainfall</li>
            <li>• Hourly breakdown for the full day</li>
            <li>• Wind speed and UV index</li>
            <li>• Sunrise and sunset times</li>
            <li>• What to wear suggestions</li>
            <li>• Activity recommendations</li>
          </ul>

          <h2 className="text-lg font-semibold pt-2">Data Source</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Weather data is provided by{" "}
            <a
              href="https://open-meteo.com"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-Meteo
            </a>
            , an open-source weather API. Forecasts are updated every hour.
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
