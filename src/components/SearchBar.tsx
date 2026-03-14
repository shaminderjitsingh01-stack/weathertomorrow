"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  slug?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(data.length > 0);
        }
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [query]);

  function handleSelect(result: SearchResult) {
    // Always use a slug URL so every search creates a proper, shareable page
    const slug = result.slug || result.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    router.push(`/${slug}`);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any city worldwide..."
          className="w-full search-input rounded-xl px-4 py-3.5 pl-11 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
          autoComplete="off"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {isLoading && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-2xl rounded-xl overflow-hidden z-50">
          {results.map((result, i) => (
            <button
              key={i}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-3.5 text-left hover:bg-white/12 transition-colors flex items-center justify-between border-b border-white/8 last:border-0"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">{result.name}</span>
              </div>
              <span className="text-xs text-white/30 font-medium">
                {result.admin1 ? `${result.admin1}, ` : ""}
                {result.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
