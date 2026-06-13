import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Clock, BookOpen } from "lucide-react";
import { AudioPlayer } from "@/components/safar/AudioPlayer";
import { LandmarkGallery } from "@/components/safar/LandmarkGallery";
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

        {/* Gallery carousel */}
        <div className="mb-8">
          <LandmarkGallery images={landmark.images} alt={landmark.name} />
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
