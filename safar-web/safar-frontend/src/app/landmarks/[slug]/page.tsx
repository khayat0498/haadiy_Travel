import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Clock, BookOpen } from "lucide-react";
import { AudioPlayer } from "@/components/safar/AudioPlayer";
import { SafarMap } from "@/components/safar/maps/SafarMap";
import { mockLandmarks, mockTranscripts } from "@/mocks/landmarks";
import { mockCities } from "@/mocks/cities";

export default async function LandmarkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landmark = mockLandmarks.find((l) => l.slug === slug);
  if (!landmark) notFound();

  const city = mockCities.find((c) => c.slug === landmark.citySlug);
  const transcript = mockTranscripts[slug];

  return (
    <div className="px-5 py-8">
      <div className="container max-w-5xl mx-auto">
        {city && (
          <Link
            href={`/cities/${city.slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="size-4" />
            Back to {city.name}
          </Link>
        )}

        <h1 className="font-heading text-3xl md:text-5xl font-semibold mb-3">
          {landmark.name}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mb-8">
          {landmark.shortDescription}
        </p>

        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src={landmark.images[0]}
            alt={landmark.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        {/* Interactive Audio Guide */}
        {landmark.audioUrl && (
          <div className="mb-8">
            <AudioPlayer
              audioUrl={landmark.audioUrl}
              title={`The Story of ${landmark.name}`}
              subtitle={city?.name}
              transcript={transcript}
              defaultLanguage="en"
            />
          </div>
        )}

        {/* Quick facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="rounded-xl ring-1 ring-border bg-card p-4 flex items-start gap-3">
            <MapPin className="size-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Location
              </p>
              <p className="text-sm font-medium">
                {landmark.lat.toFixed(4)}, {landmark.lng.toFixed(4)}
              </p>
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-border bg-card p-4 flex items-start gap-3">
            <Clock className="size-5 text-cyan shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Best Time
              </p>
              <p className="text-sm font-medium">Early morning, 8–10 AM</p>
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-border bg-card p-4 flex items-start gap-3">
            <BookOpen className="size-5 text-cyan shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Sources
              </p>
              <p className="text-sm font-medium">3 verified citations</p>
            </div>
          </div>
        </div>

        {/* Location map */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold mb-3 inline-flex items-center gap-2">
            <MapPin className="size-5 text-gold" />
            Location
          </h2>
          <SafarMap
            center={[landmark.lat, landmark.lng]}
            zoom={16}
            height="360px"
            markers={[
              {
                id: landmark.uuid,
                name: landmark.name,
                position: [landmark.lat, landmark.lng],
                description: landmark.shortDescription,
              },
            ]}
          />
        </section>

        {/* Gallery */}
        {landmark.images.length > 1 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold mb-4">
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {landmark.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-border"
                >
                  <Image
                    src={img}
                    alt={`${landmark.name} ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Overview placeholder */}
        <article className="prose prose-invert max-w-none">
          <h2 className="font-heading text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-foreground/85 leading-relaxed mb-6">
            Full historical content with quick facts, timeline, architectural
            analysis, and sources will appear here. This is a mock placeholder —
            real content is curated by historians during Phase 1A.
          </p>
        </article>
      </div>
    </div>
  );
}
