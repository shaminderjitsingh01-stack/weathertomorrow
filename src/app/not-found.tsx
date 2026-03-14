import SearchBar from "@/components/SearchBar";
import PopularCities from "@/components/PopularCities";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen weather-default">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Weather Tomorrow
          </a>
        </header>

        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🔍</div>
          <h1 className="text-xl font-bold">City Not Found</h1>
          <p className="text-sm text-white/60">
            We couldn&apos;t find that city. Try searching below.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <PopularCities />
        <Footer />
      </div>
    </div>
  );
}
