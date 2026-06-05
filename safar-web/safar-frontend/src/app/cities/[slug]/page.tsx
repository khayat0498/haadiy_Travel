import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Headphones, Clock } from "lucide-react";
import { SafarMap, type MapMarker } from "@/components/safar/maps/SafarMap";
import { mockCities } from "@/mocks/cities";
import { mockLandmarks } from "@/mocks/landmarks";

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = mockCities.find((c) => c.slug === slug);
  if (!city) notFound();

  const landmarks = mockLandmarks.filter((l) => l.citySlug === slug);

  const markers: MapMarker[] = landmarks.map((l) => ({
    id: l.uuid,
    name: l.name,
    position: [l.lat, l.lng],
    description: l.shortDescription,
    href: `/landmarks/${l.slug}`,
  }));

  return (
    <div className="px-5 py-8">
      <div className="container max-w-6xl mx-auto">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="size-4" />
          Back to Explore
        </Link>

        <div className="mb-6">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-2">
            Silk Road Heritage
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold mb-2">
            {city.name}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {city.tagline} · {landmarks.length} landmarks
          </p>
        </div>

        {/* Interactive map */}
        <section className="mb-8">
          <SafarMap
            center={[Number(city.centerLat), Number(city.centerLng)]}
            zoom={Number((city as { defaultZoom?: number }).defaultZoom) || 13}
            height="500px"
            markers={markers}
          />
        </section>

        {/* Horizontal landmark buttons (per TZ §8.1) */}
        {landmarks.length > 0 && (
          <section className="mb-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Quick Jump
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {landmarks.map((lm) => (
                <Link
                  key={lm.uuid}
                  href={`/landmarks/${lm.slug}`}
                  className="shrink-0 inline-flex items-center gap-2 px-4 h-10 rounded-full ring-1 ring-border bg-card hover:ring-gold/60 hover:bg-card text-sm font-medium transition-all"
                >
                  <MapPin className="size-3.5 text-gold" />
                  {lm.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Landmark list with cards */}
        <section>
          <h2 className="font-heading text-2xl font-semibold mb-4">
            All Landmarks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landmarks.map((lm) => (
              <Link
                key={lm.uuid}
                href={`/landmarks/${lm.slug}`}
                className="group flex gap-4 rounded-2xl ring-1 ring-border bg-card hover:ring-cyan/60 transition-all p-3"
              >
                <div className="relative size-28 shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={lm.images[0]}
                    alt={lm.name}
                    fill
                    sizes="112px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
                    {lm.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {lm.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Headphones className="size-3" />
                      Audio
                    </span>
                    {lm.durationSec && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {Math.round(lm.durationSec / 60)} min
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {landmarks.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              Landmarks coming soon for this city.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
