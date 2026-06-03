"use client";

import Link from "next/link";
import { useState } from "react";
import { Headphones, Building2 } from "lucide-react";
import { mockLandmarks } from "@/mocks/landmarks";
import { mockCities } from "@/mocks/cities";

// Mark first 3 landmarks per city as FREE, rest PREMIUM
const FREE_SLUGS = new Set([
  "registan",
  "po-i-kalyan",
  "itchan-kala",
  "khast-imam",
]);

const featuredCities = mockCities.filter((c) =>
  ["bukhara", "samarkand", "khiva"].includes(c.slug),
);

export default function ExplorePage() {
  const [selectedCity, setSelectedCity] = useState<string>("bukhara");

  const landmarks = mockLandmarks.filter(
    (l) => l.citySlug === selectedCity,
  );

  return (
    <div className="px-5 py-6">
      <div className="container max-w-5xl mx-auto">
        {/* City chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
          {featuredCities.map((c) => {
            const isActive = c.slug === selectedCity;
            return (
              <button
                type="button"
                key={c.uuid}
                onClick={() => setSelectedCity(c.slug)}
                className={`shrink-0 px-5 h-10 rounded-full font-medium text-sm transition-all ${
                  isActive
                    ? "bg-gold text-accent-foreground glow-gold"
                    : "ring-1 ring-border bg-card text-foreground/80 hover:ring-foreground/30"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {landmarks.map((lm) => {
            const isFree = FREE_SLUGS.has(lm.slug);
            const duration = lm.durationSec
              ? `${Math.floor(lm.durationSec / 60)}:${String(
                  lm.durationSec % 60,
                ).padStart(2, "0")}`
              : "—";
            return (
              <Link
                key={lm.uuid}
                href={`/landmarks/${lm.slug}`}
                className="group relative rounded-2xl ring-1 ring-border bg-card p-4 hover:ring-cyan/60 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Badge */}
                <span
                  className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    isFree
                      ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                      : "bg-gold/20 text-gold ring-1 ring-gold/40"
                  }`}
                >
                  {isFree ? "FREE" : "PREMIUM"}
                </span>

                {/* Icon */}
                <span className="inline-flex size-11 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 ring-1 ring-gold/40 items-center justify-center mb-3">
                  <Building2 className="size-5 text-gold" strokeWidth={2} />
                </span>

                <h3 className="font-heading text-lg font-semibold mb-1.5 leading-tight">
                  {lm.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 min-h-[2lh]">
                  {lm.shortDescription}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Headphones className="size-3.5" />
                    {duration}
                  </span>
                  <span className="text-gold font-medium group-hover:text-gold-glow inline-flex items-center gap-0.5">
                    Play Story <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            );
          })}

          {landmarks.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No stories yet for this city.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
