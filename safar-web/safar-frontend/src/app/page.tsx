import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Headphones,
  Map as MapIcon,
  Hotel,
  Clock,
  Tag,
  MapPin,
  Star,
} from "lucide-react";
import { mockCities } from "@/mocks/cities";
import { FavoriteButton } from "@/components/safar/FavoriteButton";

const cityRatings: Record<string, number> = {
  bukhara: 4.9,
  samarkand: 4.8,
  khiva: 4.7,
  tashkent: 4.6,
  surkhandarya: 4.5,
};

const cityPrices: Record<string, { price: string; hours: string }> = {
  bukhara: { price: "$25", hours: "3 hours" },
  samarkand: { price: "$30", hours: "4 hours" },
  khiva: { price: "$20", hours: "2 hours" },
};

const categories = [
  {
    icon: Headphones,
    title: "Audio Guides",
    description: "Travel on your own. Use the services of an audio guide.",
    cta: "Select guide",
    href: "/explore",
  },
  {
    icon: MapIcon,
    title: "Programs",
    description: "Choose a travel program that is right for you.",
    cta: "Select program",
    href: "/explore",
  },
  {
    icon: Hotel,
    title: "Hotels & Restaurants",
    description: "Book hotels and restaurants at the best prices.",
    cta: "Learn more",
    href: "/book",
  },
];

export default function HomePage() {
  const featuredCities = mockCities.filter((c) =>
    ["bukhara", "samarkand", "khiva"].includes(c.slug),
  );

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="md:px-5 md:pt-6">
        <div className="md:max-w-6xl md:mx-auto">
          <div className="relative isolate flex items-center justify-center text-center px-8 sm:px-10 pt-16 pb-32 md:pt-24 md:pb-40 min-h-[60vh] md:min-h-[75vh] md:rounded-3xl overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/6745544_original.jpg"
                alt=""
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 40%, transparent, oklch(0.1 0.02 200 / 45%) 95%)",
                }}
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.15] md:leading-[1.1] text-white mb-5 md:mb-6">
                The Silk Road Has Never{" "}
                <span
                  className="italic bg-clip-text text-transparent inline-block pr-1.5 md:pr-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, oklch(0.92 0.18 86), oklch(0.78 0.16 70))",
                  }}
                >
                  Been So Vivid
                </span>
              </h1>
              <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
                Discover Uzbekistan. Choose the best programs, audio guides,
                hotels, and stories across the ancient Silk Road cities.
              </p>
              <Link
                href="/explore"
                className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full font-medium transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.18 86), oklch(0.78 0.16 70))",
                  color: "oklch(0.18 0.02 200)",
                  boxShadow:
                    "0 12px 30px -8px oklch(0.85 0.16 86 / 50%), inset 0 1px 0 oklch(0.95 0.1 86)",
                }}
              >
                Start to explore
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS — overlapping bottom of hero */}
      <section className="relative -mt-24 md:-mt-28 px-5 mb-16 md:mb-24">
        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative rounded-2xl p-5 md:p-6 overflow-hidden transition-all hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.22 0.03 200 / 85%), oklch(0.18 0.025 200 / 75%))",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 oklch(1 0 0 / 6%)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-white">
                    {cat.title}
                  </h3>
                  <span
                    className="inline-flex size-10 rounded-xl items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(160deg, oklch(0.85 0.16 86 / 25%), oklch(0.85 0.16 86 / 10%))",
                      border: "1px solid oklch(0.85 0.16 86 / 35%)",
                    }}
                  >
                    <Icon className="size-4 text-gold" strokeWidth={2} />
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-gold border-b border-gold/40 pb-0.5 group-hover:border-gold transition-colors">
                  {cat.cta}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TOP PROGRAMS / CITIES */}
      <section className="px-5 pb-20">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
              Top Destinations
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Our programs are compiled by the best guides. Each traveler will
              find a program that fits their level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {featuredCities.map((city, idx) => {
              const rating = cityRatings[city.slug] ?? 4.7;
              const meta = cityPrices[city.slug] ?? {
                price: "$25",
                hours: "3 hours",
              };
              // Vary heights on desktop for a masonry-like feel
              const aspectClass =
                idx % 3 === 1
                  ? "aspect-[4/3] sm:aspect-[3/4]"
                  : "aspect-[4/3] sm:aspect-[4/5]";
              return (
                <Link
                  key={city.uuid}
                  href={`/cities/${city.slug}`}
                  className={`group relative rounded-3xl overflow-hidden ${aspectClass} transition-all hover:-translate-y-1.5`}
                  style={{
                    border: "1px solid oklch(1 0 0 / 8%)",
                    boxShadow:
                      "0 20px 50px -20px rgba(0,0,0,0.4), inset 0 1px 0 oklch(1 0 0 / 6%)",
                  }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${city.image})` }}
                  />

                  {/* Dark gradient — top and bottom for legibility */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"
                  />

                  {/* Favorite */}
                  <FavoriteButton
                    label={`Save ${city.name}`}
                    className="absolute top-3 right-3"
                  />

                  {/* Top-left meta: price + duration */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-medium text-white ring-1 ring-white/15">
                      <Tag className="size-3" />
                      {meta.price}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/45 backdrop-blur-md text-[11px] font-medium text-white ring-1 ring-white/15">
                      <Clock className="size-3" />
                      {meta.hours}
                    </span>
                  </div>

                  {/* Title — upper area */}
                  <div className="absolute inset-x-0 top-14 px-4 pointer-events-none">
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-white drop-shadow-lg group-hover:text-gold-glow transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-white/75 mt-0.5 line-clamp-1">
                      {city.tagline}
                    </p>
                  </div>

                  {/* Bottom: rating + landmarks badge */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/15 text-white">
                        <MapPin className="size-3" />
                        {city.landmarkCount}+
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/15 text-white">
                        <Star className="size-3 fill-gold text-gold" />
                        <span className="tabular-nums">
                          {rating.toFixed(1)}
                        </span>
                      </span>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 h-8 px-3 rounded-full text-[11px] font-medium whitespace-nowrap transition-transform group-hover:translate-x-0.5"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.78 0.14 200), oklch(0.65 0.14 200))",
                        color: "white",
                        boxShadow:
                          "0 6px 16px -4px oklch(0.78 0.14 200 / 50%), inset 0 1px 0 oklch(0.9 0.1 200)",
                      }}
                    >
                      Explore
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
