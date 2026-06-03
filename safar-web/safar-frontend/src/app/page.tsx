import Link from "next/link";
import { ArrowRight, Play, MapPin, Download, MessageCircle } from "lucide-react";
import { mockCities } from "@/mocks/cities";

const stats = [
  { value: "50+", label: "Stories" },
  { value: "3", label: "Cities" },
  { value: "3", label: "Languages" },
];

const features = [
  {
    icon: MapPin,
    title: "GPS Auto-Play",
    description: "Stories begin automatically as you approach landmarks",
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download stories and explore without internet",
  },
  {
    icon: MessageCircle,
    title: "Ask Safar AI",
    description: "Get answers to any question about Silk Road history",
  },
];

// Map city slug → gradient (matches Canva mockup colors)
const cityGradients: Record<string, string> = {
  bukhara: "from-cyan/40 via-cyan/15 to-card",
  samarkand: "from-gold/40 via-gold/15 to-card",
  khiva: "from-purple-500/40 via-purple-500/15 to-card",
  tashkent: "from-emerald-500/40 via-emerald-500/15 to-card",
  surkhandarya: "from-rose-500/40 via-rose-500/15 to-card",
};

export default function HomePage() {
  // MVP shows 3 main cities (per Canva)
  const featuredCities = mockCities.filter((c) =>
    ["bukhara", "samarkand", "khiva"].includes(c.slug),
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative px-6 pt-12 pb-16 text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, oklch(0.4 0.08 200 / 35%), transparent), radial-gradient(ellipse 40% 30% at 50% 70%, oklch(0.85 0.16 86 / 8%), transparent)",
          }}
        />
        <p className="text-gold text-xs uppercase tracking-[0.35em] mb-4">
          The Silk Road Awaits
        </p>
        <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-[1.1] mb-5">
          Journey Through{" "}
          <span className="text-gold italic">Time</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
          Discover the golden history of Bukhara, Samarkand & Khiva through
          immersive audio stories.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-10">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full bg-gold hover:bg-gold-glow text-accent-foreground font-medium transition-all glow-gold group"
          >
            Start Your Journey
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/explore?filter=free"
            className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full border border-foreground/20 hover:bg-foreground/5 font-medium transition-colors"
          >
            <Play className="size-4 fill-current" />
            Try Free Stories
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-2xl md:text-3xl font-bold text-gold italic">
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SAFAR */}
      <section className="px-6 py-14">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
              Why Safar?
            </h2>
            <p className="text-sm text-muted-foreground">
              More than a guide — an experience that brings history to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl ring-1 ring-border bg-card p-6 text-center hover:ring-cyan/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="inline-flex size-14 rounded-xl bg-cyan/15 ring-1 ring-cyan/30 items-center justify-center mb-4">
                    <Icon className="size-6 text-cyan" strokeWidth={2} />
                  </span>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPLORE CITIES */}
      <section className="px-6 py-14 border-t border-border/40">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
              Explore Ancient Cities
            </h2>
            <p className="text-sm text-muted-foreground">
              Three jewels of the Silk Road
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCities.map((city) => (
              <Link
                key={city.uuid}
                href={`/cities/${city.slug}`}
                className={`group relative rounded-2xl overflow-hidden ring-1 ring-border bg-gradient-to-br ${
                  cityGradients[city.slug] ?? "from-cyan/30 to-card"
                } aspect-[4/5] hover:ring-cyan/60 transition-all duration-500`}
              >
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-2">
                    {city.landmarkCount}+ Landmarks
                  </p>
                  <h3 className="font-heading text-2xl font-semibold mb-1 group-hover:text-cyan-glow transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-foreground/70">{city.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
