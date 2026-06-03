import type { City } from "@/types";

// Real Uzbekistan imagery from Wikimedia Commons
export const mockCities: City[] = [
  {
    uuid: "11111111-1111-1111-1111-111111111111",
    slug: "samarkand",
    name: "Samarkand",
    tagline: "The Heart of the Empire",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Registan_square_Samarkand.jpg/1280px-Registan_square_Samarkand.jpg",
    centerLat: 39.65485,
    centerLng: 66.969459,
    landmarkCount: 11,
  },
  {
    uuid: "22222222-2222-2222-2222-222222222222",
    slug: "bukhara",
    name: "Bukhara",
    tagline: "City of Infinite Wisdom",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ark_Of_Bukhara.jpg/1280px-Ark_Of_Bukhara.jpg",
    centerLat: 39.77687,
    centerLng: 64.4281,
    landmarkCount: 12,
  },
  {
    uuid: "33333333-3333-3333-3333-333333333333",
    slug: "khiva",
    name: "Khiva",
    tagline: "The Open Air Museum",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Islam_Khodja_Madrasa_01.jpg/1280px-Islam_Khodja_Madrasa_01.jpg",
    centerLat: 41.3783,
    centerLng: 60.367,
    landmarkCount: 11,
  },
  {
    uuid: "44444444-4444-4444-4444-444444444444",
    slug: "tashkent",
    name: "Tashkent",
    tagline: "Gateway of the East",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hazrat_imam_complex_panoramic_view.jpg/1280px-Hazrat_imam_complex_panoramic_view.jpg",
    centerLat: 41.299496,
    centerLng: 69.240073,
    landmarkCount: 12,
  },
  {
    uuid: "55555555-5555-5555-5555-555555555555",
    slug: "surkhandarya",
    name: "Surkhandarya",
    tagline: "Seeker of Ancient Worlds",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Termez_Sultan_Saodat_complex.jpg/1280px-Termez_Sultan_Saodat_complex.jpg",
    centerLat: 37.22437,
    centerLng: 67.27305,
    landmarkCount: 11,
  },
];
