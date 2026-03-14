"use client";

export default function WeatherParticles() {
  return (
    <div className="weather-particles pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* Floating clouds */}
      <div className="particle-cloud particle-cloud-1" />
      <div className="particle-cloud particle-cloud-2" />
      <div className="particle-cloud particle-cloud-3" />

      {/* Subtle floating dots (stars / particles) */}
      <div className="particle-dot particle-dot-1" />
      <div className="particle-dot particle-dot-2" />
      <div className="particle-dot particle-dot-3" />
      <div className="particle-dot particle-dot-4" />
      <div className="particle-dot particle-dot-5" />
      <div className="particle-dot particle-dot-6" />
      <div className="particle-dot particle-dot-7" />
      <div className="particle-dot particle-dot-8" />
    </div>
  );
}
