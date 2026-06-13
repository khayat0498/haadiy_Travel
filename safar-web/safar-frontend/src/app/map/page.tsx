"use client";

import { useMemo, useState } from "react";
import { SafarMap, type MapMarker } from "@/components/safar/maps/SafarMap";
import { mockLandmarks } from "@/mocks/landmarks";
import { mockCities } from "@/mocks/cities";

const ALL = "all" as const;
type CitySelection = typeof ALL | string;

// Wider view for "All" — covers all of Uzbekistan; per-city is zoomed in.
const ALL_CENTER: [number, number] = [41.0, 64.5];
const ALL_ZOOM = 6;
const CITY_ZOOM = 13;

export default function MapPage() {
  const [selected, setSelected] = useState<CitySelection>(ALL);

  const filteredLandmarks = useMemo(
    () =>
      selected === ALL
        ? mockLandmarks
        : mockLandmarks.filter((l) => l.citySlug === selected),
    [selected],
  );

  const markers: MapMarker[] = useMemo(
    () =>
      filteredLandmarks.map((l) => ({
        id: l.uuid,
        name: l.name,
        position: [l.lat, l.lng],
        href: `/landmarks/${l.slug}`,
        description: l.shortDescription,
      })),
    [filteredLandmarks],
  );

  const { center, zoom } = useMemo(() => {
    if (selected === ALL) return { center: ALL_CENTER, zoom: ALL_ZOOM };
    const city = mockCities.find((c) => c.slug === selected);
    if (!city) return { center: ALL_CENTER, zoom: ALL_ZOOM };
    return {
      center: [Number(city.centerLat), Number(city.centerLng)] as [
        number,
        number,
      ],
      zoom: CITY_ZOOM,
    };
  }, [selected]);

  return (
    <div className="fixed left-0 right-0 top-[88px] bottom-[60px] md:top-[104px] md:bottom-0 z-0">
      {/* Floating city filter — overlays the map */}
      <div className="absolute left-0 right-0 top-0 z-10 pointer-events-none">
        <div className="pointer-events-auto px-3 pt-3 md:pt-4 md:px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <FilterPill
                active={selected === ALL}
                onClick={() => setSelected(ALL)}
                count={mockLandmarks.length}
              >
                All
              </FilterPill>
              {mockCities.map((c) => {
                const cityCount = mockLandmarks.filter(
                  (l) => l.citySlug === c.slug,
                ).length;
                return (
                  <FilterPill
                    key={c.slug}
                    active={selected === c.slug}
                    onClick={() => setSelected(c.slug)}
                    count={cityCount}
                  >
                    {c.name}
                  </FilterPill>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Remount the map when filter changes so center + zoom take effect */}
      <SafarMap
        key={selected}
        center={center}
        zoom={zoom}
        markers={markers}
        height="100%"
        tileStyle="light"
        className="!rounded-none !ring-0"
        showUserLocation
      />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-1.5 h-9 md:h-10 px-3.5 md:px-4 rounded-full text-xs md:text-sm font-medium transition-all backdrop-blur-md ${
        active
          ? "bg-gold text-accent-foreground glow-gold ring-1 ring-gold/60"
          : "bg-card/85 text-foreground/85 ring-1 ring-border hover:ring-foreground/30"
      }`}
    >
      {children}
      <span
        className={`tabular-nums text-[10px] md:text-[11px] px-1.5 py-0.5 rounded-full ${
          active
            ? "bg-black/15 text-accent-foreground"
            : "bg-foreground/10 text-foreground/70"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
