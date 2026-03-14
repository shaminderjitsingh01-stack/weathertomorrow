"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeolocateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleGeolocate() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        router.push(`/?lat=${latitude}&lon=${longitude}`);
        setIsLoading(false);
      },
      () => {
        alert("Unable to get your location. Please search for a city instead.");
        setIsLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  return (
    <button
      onClick={handleGeolocate}
      disabled={isLoading}
      className="glass-light rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
          Locating...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Use My Location
        </>
      )}
    </button>
  );
}
