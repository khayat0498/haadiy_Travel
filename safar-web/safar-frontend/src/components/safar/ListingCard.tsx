import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type ListingCardProps = {
  href: string;
  image: string;
  title: string;
  description: string;
  badge?: string;
  category?: string;
  rating?: number;
  price?: { label: string; value: string };
  cta?: string;
};

export function ListingCard({
  href,
  image,
  title,
  description,
  badge,
  category,
  rating,
  price,
  cta = "Book Now",
}: ListingCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden ring-1 ring-border bg-card hover:ring-cyan/60 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-accent-foreground text-[10px] font-bold uppercase tracking-widest">
            {badge}
          </span>
        )}
        {category && (
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-cyan/20 backdrop-blur ring-1 ring-cyan/40 text-cyan text-[10px] font-semibold uppercase tracking-widest">
            {category}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-heading text-lg font-semibold leading-tight">
            {title}
          </h3>
          {rating && (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="size-3.5 fill-gold text-gold" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-end justify-between">
          {price && (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {price.label}
              </p>
              <p className="font-heading text-xl font-semibold">
                {price.value}
              </p>
            </div>
          )}
          <Link
            href={href}
            className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground text-sm font-medium transition-colors"
          >
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
