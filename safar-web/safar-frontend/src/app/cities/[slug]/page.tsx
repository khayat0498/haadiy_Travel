import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Headphones } from "lucide-react";
import { Header } from "@/components/safar/Header";
import { Footer } from "@/components/safar/Footer";
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

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src={city.image}
            alt={city.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute inset-0 flex items-end pb-16 px-6">
            <div className="container max-w-6xl mx-auto">
              <p className="text-cyan text-xs uppercase tracking-[0.3em] mb-2">
                Silk Road Heritage
              </p>
              <h1 className="font-heading text-5xl md:text-7xl font-semibold mb-3 text-white drop-shadow-2xl">
                {city.name}
              </h1>
              <p className="text-xl text-white/90 drop-shadow-lg">
                {city.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Landmarks */}
        <section className="py-16 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl font-semibold mb-2">
                  Landmarks
                </h2>
                <p className="text-muted-foreground">
                  {landmarks.length} verified monuments to discover
                </p>
              </div>
              <Link
                href="/map"
                className="hidden sm:inline-flex items-center gap-2 text-cyan hover:text-cyan-glow text-sm font-medium"
              >
                <MapPin className="size-4" />
                Open on map
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {landmarks.map((lm) => (
                <Link
                  key={lm.uuid}
                  href={`/landmarks/${lm.slug}`}
                  className="group flex gap-4 rounded-2xl ring-1 ring-border bg-card hover:ring-cyan/60 transition-all p-3"
                >
                  <div className="relative size-32 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={lm.images[0]}
                      alt={lm.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-cyan transition-colors">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
