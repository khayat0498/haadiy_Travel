export type City = {
  uuid: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  centerLat: number;
  centerLng: number;
  landmarkCount: number;
};

export type Landmark = {
  uuid: string;
  citySlug: string;
  slug: string;
  name: string;
  shortDescription: string;
  images: string[];
  lat: number;
  lng: number;
  audioUrl: string | null;
  durationSec: number | null;
};

export type AccessPlanType = "day_pass" | "city_pack" | "silk_road_pass";

export type AccessPlan = {
  uuid: string;
  type: AccessPlanType;
  citySlug?: string;
  name: string;
  description: string;
  priceUzs: number;
  priceUsdCents: number;
  durationHours: number | null;
  features: string[];
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};
