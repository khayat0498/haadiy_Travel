"use client";

import { useState } from "react";
import { Clock, MapPin, Building2, Bed, UtensilsCrossed } from "lucide-react";
import { mockTours, mockHotels, mockRestaurants } from "@/mocks/listings";

const tabs = [
  { id: "tours", label: "Tours", icon: Building2 },
  { id: "hotels", label: "Hotels", icon: Bed },
  { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function BookPage() {
  const [active, setActive] = useState<TabId>("tours");

  return (
    <div className="px-5 py-8">
      <div className="container max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-1.5">
            Book Services
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete your Silk Road experience
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-8 overflow-x-auto -mx-1 px-1 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-5 h-10 rounded-full font-medium text-sm transition-all ${
                  isActive
                    ? "bg-gold text-accent-foreground glow-gold"
                    : "ring-1 ring-border bg-card text-foreground/80 hover:ring-foreground/30"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tours */}
        {active === "tours" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTours.map((t) => (
              <div
                key={t.uuid}
                className="rounded-2xl ring-1 ring-border bg-card p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="size-11 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 ring-1 ring-gold/40 grid place-items-center shrink-0">
                    <Building2 className="size-5 text-gold" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold leading-tight truncate">
                      {t.name}
                    </h3>
                    <p className="text-gold font-semibold">${t.priceUsd}</p>
                  </div>
                </div>
                <div className="space-y-1 mb-4 text-xs text-muted-foreground">
                  <p className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {Math.round((t.priceUsd / 100) * 8)} hours
                  </p>
                  <p className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {t.citySlug.charAt(0).toUpperCase() + t.citySlug.slice(1)}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full h-10 rounded-lg bg-gold hover:bg-gold-glow text-accent-foreground font-medium text-sm transition-colors"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hotels */}
        {active === "hotels" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHotels.map((h) => (
              <div
                key={h.uuid}
                className="rounded-2xl ring-1 ring-border bg-card p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="size-11 rounded-xl bg-gradient-to-br from-cyan/30 to-cyan/10 ring-1 ring-cyan/40 grid place-items-center shrink-0">
                    <Bed className="size-5 text-cyan" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold leading-tight truncate">
                      {h.name}
                    </h3>
                    <p className="text-cyan font-semibold">
                      ${h.pricePerNight}
                      <span className="text-xs text-muted-foreground"> / night</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {h.description}
                </p>
                <button
                  type="button"
                  className="w-full h-10 rounded-lg bg-cyan hover:bg-cyan-glow text-primary-foreground font-medium text-sm transition-colors"
                >
                  Reserve
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Restaurants */}
        {active === "restaurants" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRestaurants.map((r) => (
              <div
                key={r.uuid}
                className="rounded-2xl ring-1 ring-border bg-card p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="size-11 rounded-xl bg-gradient-to-br from-rose-500/30 to-rose-500/10 ring-1 ring-rose-500/40 grid place-items-center shrink-0">
                    <UtensilsCrossed className="size-5 text-rose-400" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold leading-tight truncate">
                      {r.name}
                    </h3>
                    <p className="text-rose-400 font-semibold">
                      ${r.averageMeal}
                      <span className="text-xs text-muted-foreground"> / meal</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {r.description}
                </p>
                <button
                  type="button"
                  className="w-full h-10 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-medium text-sm transition-colors"
                >
                  Reserve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
