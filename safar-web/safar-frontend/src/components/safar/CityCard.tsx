import Image from "next/image";
import Link from "next/link";
import type { City } from "@/types";

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-border hover:ring-cyan/60 transition-all duration-500"
    >
      <Image
        src={city.image}
        alt={city.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.85 0.16 86 / 30%), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="font-heading text-2xl font-semibold mb-1 text-white drop-shadow-lg group-hover:text-cyan-glow transition-colors">
          {city.name}
        </h3>
        <p className="text-sm text-white/85 drop-shadow">{city.tagline}</p>
        <p className="mt-3 text-xs text-cyan uppercase tracking-widest font-medium">
          {city.landmarkCount} landmarks →
        </p>
      </div>
    </Link>
  );
}
