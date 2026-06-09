"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// CartoDB tile providers — free, attribution required
const TILES = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
} as const;

export type MapMarker = {
  id: string;
  name: string;
  position: [number, number]; // [lat, lng]
  href?: string;
  description?: string;
};

type Props = {
  center: [number, number];
  zoom?: number;
  markers: MapMarker[];
  height?: string;
  className?: string;
  tileStyle?: "light" | "dark" | "auto";
};

// Custom gold pin (matches Safar brand)
const goldPin = L.divIcon({
  className: "safar-pin",
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44" fill="none">
      <path
        d="M16 0C7.16 0 0 7.16 0 16c0 12 16 28 16 28s16-16 16-28C32 7.16 24.84 0 16 0z"
        fill="url(#g)" stroke="#0a1a1d" stroke-width="1.5"/>
      <circle cx="16" cy="16" r="6" fill="#0a1a1d"/>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fcd34d"/>
          <stop offset="1" stop-color="#d4a574"/>
        </linearGradient>
      </defs>
    </svg>
  `,
  iconSize: [32, 44],
  iconAnchor: [16, 44],
  popupAnchor: [0, -40],
});

export function SafarMap({
  center,
  zoom = 13,
  markers,
  height = "400px",
  className = "",
  tileStyle = "auto",
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveStyle =
    tileStyle === "auto"
      ? resolvedTheme === "light"
        ? "light"
        : "dark"
      : tileStyle;
  const tileUrl = effectiveStyle === "light" ? TILES.light : TILES.dark;

  if (!mounted) {
    return (
      <div
        className={`rounded-2xl bg-card ring-1 ring-border animate-pulse ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden ring-1 ring-border safar-map-${effectiveStyle} ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Tiles auto-switch with theme (key forces remount on theme change) */}
        <TileLayer
          key={tileUrl}
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        {markers.map((m) => (
          <Marker key={m.id} position={m.position} icon={goldPin}>
            <Popup maxWidth={220} minWidth={160}>
              <div className="text-[13px] font-semibold leading-tight mb-1">
                {m.name}
              </div>
              {m.description && (
                <div className="text-[11px] text-gray-600 mb-1.5 leading-snug line-clamp-2">
                  {m.description}
                </div>
              )}
              {m.href && (
                <Link
                  href={m.href}
                  className="text-[11px] font-medium text-cyan-700 hover:underline"
                >
                  View details →
                </Link>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
