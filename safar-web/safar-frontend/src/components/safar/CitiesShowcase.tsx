import { mockCities } from "@/mocks/cities";
import { CityCard } from "./CityCard";

export function CitiesShowcase() {
  // MVP: top 3 cities visible by default (Samarkand, Bukhara, Khiva)
  const featured = mockCities.slice(0, 3);

  return (
    <section className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3">
            Premium Heritage Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Step into history with high-fidelity digital twins of ancient
            monuments, curated by leading historians and brought to life with
            verified sources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((city) => (
            <CityCard key={city.uuid} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
