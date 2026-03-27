import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherTicker from "@/components/WeatherTicker";
import LoginButton from "@/components/LoginButton";
import { getAllPosts } from "@/lib/blog";
import BlogListClient from "@/components/BlogListClient";

export const metadata: Metadata = {
  title: "Weather Blog — Tips, City Guides & Forecasting Explained",
  description:
    "Weather tips, city weather guides, and practical advice for planning around the forecast. Learn what to wear, when to expect rain, and how to read the weather.",
  openGraph: {
    title: "Weather Blog — Tips, City Guides & Forecasting Explained",
    description:
      "Weather tips, city weather guides, and practical advice for planning around the forecast.",
    url: "https://www.weathertomorrow.app/blog",
  },
  alternates: {
    canonical: "https://www.weathertomorrow.app/blog",
  },
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen weather-default">
      <LoginButton />

      <Suspense fallback={null}>
        <WeatherTicker />
      </Suspense>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4">
        <Header subtitle="Blog" />

        {/* Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Weather Blog
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            City guides, weather tips, and practical advice for planning your day around the forecast.
          </p>
        </div>

        {/* Client component for search + filtering */}
        <BlogListClient posts={posts} />

        {/* Subscribe CTA */}
        <div className="mt-12 card-elevated rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-lg font-bold mb-2">Never miss a forecast</h2>
          <p className="text-sm text-white/40 mb-4 max-w-sm mx-auto">
            Get tomorrow&apos;s weather delivered to your inbox every evening. Free, no spam.
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-bold transition-colors"
          >
            Subscribe — Free
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
