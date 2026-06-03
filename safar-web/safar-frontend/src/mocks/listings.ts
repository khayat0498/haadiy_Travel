const img = (seed: string, w = 1000, h = 700) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type TourListing = {
  uuid: string;
  slug: string;
  citySlug: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  priceUsd: number;
  category: string;
  badge?: string;
};

export const mockTours: TourListing[] = [
  {
    uuid: "tour-1",
    slug: "golden-bukhara",
    citySlug: "bukhara",
    name: "The Golden Bukhara Tour",
    description:
      "Explore the legendary Ark Fortress and Chor Minor with an exclusive historical recreation.",
    image: img("tour-bukhara"),
    rating: 4.9,
    priceUsd: 1299,
    category: "Cultural Heritage",
    badge: "Premium",
  },
  {
    uuid: "tour-2",
    slug: "samarkand-blue",
    citySlug: "samarkand",
    name: "Samarkand Blue Majesty",
    description:
      "A deep dive into Timurid architecture at Registan Square with structural insights.",
    image: img("tour-samarkand"),
    rating: 5.0,
    priceUsd: 1550,
    category: "Architecture",
    badge: "High Demand",
  },
  {
    uuid: "tour-3",
    slug: "khiva-night",
    citySlug: "khiva",
    name: "Khiva: Itchan Kala Night",
    description:
      "Walk the inner city of Khiva under the stars with overlays of medieval Silk Road life.",
    image: img("tour-khiva"),
    rating: 4.8,
    priceUsd: 980,
    category: "Ancient Desert City",
    badge: "Premium",
  },
];

export type HotelListing = {
  uuid: string;
  slug: string;
  citySlug: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  pricePerNight: number;
  category: string;
};

export const mockHotels: HotelListing[] = [
  {
    uuid: "hotel-1",
    slug: "sultan-palace",
    citySlug: "bukhara",
    name: "The Sultan Palace",
    description:
      "A five-star boutique hotel located within the walls of old Bukhara. Heritage meets modern comfort.",
    image: img("hotel-sultan"),
    rating: 5.0,
    pricePerNight: 450,
    category: "Luxury Stay",
  },
  {
    uuid: "hotel-2",
    slug: "registan-grand",
    citySlug: "samarkand",
    name: "Registan Grand",
    description:
      "Steps from the iconic square — wake up to Timurid views and traditional breakfast.",
    image: img("hotel-registan"),
    rating: 4.7,
    pricePerNight: 320,
    category: "Premium",
  },
];

export type RestaurantListing = {
  uuid: string;
  slug: string;
  citySlug: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  averageMeal: number;
  category: string;
};

export const mockRestaurants: RestaurantListing[] = [
  {
    uuid: "rest-1",
    slug: "silk-road-dining",
    citySlug: "samarkand",
    name: "Silk Road Dining Hall",
    description:
      "Award-winning Samarkand plov and traditional kebabs served in an 18th-century caravanserai.",
    image: img("rest-silkroad"),
    rating: 4.7,
    averageMeal: 85,
    category: "Gastronomy",
  },
  {
    uuid: "rest-2",
    slug: "minaret-tea",
    citySlug: "bukhara",
    name: "Minaret Tea House",
    description:
      "Centuries-old chaikhana where caravans once paused. Traditional samsa and shashlik.",
    image: img("rest-minaret"),
    rating: 4.6,
    averageMeal: 35,
    category: "Tea House",
  },
];
