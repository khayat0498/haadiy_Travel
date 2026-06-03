import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background gradient (rasm yuklab solib bo'lgach almashtiriladi) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, oklch(0.4 0.08 200 / 50%), transparent), radial-gradient(ellipse 50% 30% at 80% 80%, oklch(0.85 0.16 86 / 8%), transparent)",
        }}
      />

      <div className="container max-w-5xl mx-auto px-6 text-center pt-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 ring-1 ring-cyan/30 text-cyan text-xs uppercase tracking-[0.2em] mb-8">
          ✦ Next Gen 3D Exploration
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] mb-6">
          Journey Through
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, oklch(0.85 0.16 86), oklch(0.78 0.14 50))",
            }}
          >
            the Silk Road
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
          Experience the golden age of travel with immersive guided tours
          through the majestic landscapes of Central Asia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/explore"
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground font-medium transition-all glow-cyan"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-foreground/20 hover:bg-foreground/5 font-medium transition-colors"
          >
            <Play className="size-4 fill-current" />
            Watch Demo
          </Link>
        </div>

        <div className="mt-20 text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
          Scroll to discover
        </div>
      </div>
    </section>
  );
}
