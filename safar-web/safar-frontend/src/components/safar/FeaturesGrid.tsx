import { Compass, Headphones, MapPin, Gem } from "lucide-react";
import { mockFeatures } from "@/mocks/features";

const iconMap = {
  compass: Compass,
  headphones: Headphones,
  "map-pin": MapPin,
  gem: Gem,
} as const;

export function FeaturesGrid() {
  return (
    <section className="py-20 px-6 bg-card/40">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockFeatures.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl ring-1 ring-border hover:ring-cyan/40 hover:-translate-y-1 transition-all duration-300 bg-card/60"
              >
                <span className="inline-flex size-11 rounded-xl bg-cyan/15 ring-1 ring-cyan/30 items-center justify-center mb-4">
                  {Icon && <Icon className="size-5 text-cyan" strokeWidth={2} />}
                </span>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
