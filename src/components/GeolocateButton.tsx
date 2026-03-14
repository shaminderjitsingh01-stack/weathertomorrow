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
      className="card-interactive rounded-xl px-5 py-3.5 text-sm font-semibold flex items-center gap-2.5 disabled:opacity-50 cursor-pointer"
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          <span className="text-white/60">Detecting location...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z"
            />
            <circle cx="12" cy="9" r="2.5" strokeWidth={2} />
          </svg>
          Use My Location
        </>
      )}
    </button>
  );
}
