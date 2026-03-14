import SearchBar from "@/components/SearchBar";
import PopularCities from "@/components/PopularCities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-4">
        <Header />

        <div className="card-elevated rounded-3xl p-8 text-center my-8">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-white/25 mb-4">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <h1 className="text-lg font-bold mb-2">City Not Found</h1>
          <p className="text-sm text-white/35 mb-6">
            We couldn&apos;t find that city. Try searching below.
          </p>
          <SearchBar />
        </div>

        <PopularCities />
        <Footer />
      </div>
    </div>
  );
}
