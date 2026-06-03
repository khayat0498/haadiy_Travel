import type { AccessPlan } from "@/types";

export const mockPlans: AccessPlan[] = [
  {
    uuid: "plan-day",
    type: "day_pass",
    name: "Day Pass",
    description: "Full access for 24 hours — perfect for spontaneous tourists.",
    priceUzs: 30_000,
    priceUsdCents: 299,
    durationHours: 24,
    features: [
      "All 5 cities unlocked",
      "GPS auto-play audio",
      "All landmark stories",
      "Comfort & nearby info",
    ],
  },
  {
    uuid: "plan-city",
    type: "city_pack",
    name: "City Pack",
    description:
      "Lifetime access to one city of your choice — your favourite place forever.",
    priceUzs: 100_000,
    priceUsdCents: 999,
    durationHours: null,
    features: [
      "1 city, lifetime access",
      "GPS auto-play audio",
      "Offline city pack (Phase 2)",
      "Notes & sources",
    ],
  },
  {
    uuid: "plan-silkroad",
    type: "silk_road_pass",
    name: "Silk Road Pass",
    description: "Lifetime access to all 5 Silk Road cities. Most popular.",
    priceUzs: 390_000,
    priceUsdCents: 3900,
    durationHours: null,
    features: [
      "All 5 cities, lifetime",
      "GPS auto-play audio",
      "Premium content layer",
      "Silk Road Explorer badge",
      "Priority support",
    ],
  },
];
