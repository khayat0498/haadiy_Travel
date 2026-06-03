import Link from "next/link";
import { MapPin, Navigation, Info, Settings } from "lucide-react";
import { Header } from "@/components/safar/Header";
import { mockCities } from "@/mocks/cities";

export default function MapPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 px-6 pb-10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0 space-y-3">
              <div className="rounded-2xl ring-1 ring-cyan/40 bg-card p-5 glow-cyan">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="size-4 text-cyan" />
                  <p className="text-[10px] uppercase tracking-widest text-cyan font-semibold">
                    Current Location
                  </p>
                </div>
                <p className="font-heading text-lg font-semibold mb-3">
                  Po-i-Kalyan Complex
                </p>
                <button
                  type="button"
                  className="w-full h-10 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground text-sm font-medium transition-colors"
                >
                  GPS ACTIVE
                </button>
              </div>

              <nav className="rounded-2xl ring-1 ring-border bg-card p-2">
                {[
                  { icon: MapPin, label: "Interactive Map", active: true },
                  { icon: Navigation, label: "Discover Nearby" },
                  { icon: Info, label: "Details" },
                  { icon: Settings, label: "Preferences" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                        item.active
                          ? "bg-cyan/15 text-cyan"
                          : "hover:bg-foreground/5 text-foreground/80"
                      }`}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="rounded-2xl ring-1 ring-border bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Cities
                </p>
                <ul className="space-y-1.5">
                  {mockCities.map((c) => (
                    <li key={c.uuid}>
                      <Link
                        href={`/cities/${c.slug}`}
                        className="block px-3 py-2 rounded-lg text-sm hover:bg-foreground/5 transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Map placeholder */}
            <div className="flex-1 relative rounded-2xl overflow-hidden ring-1 ring-border bg-card min-h-[600px]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center px-6">
                  <div className="size-20 rounded-full bg-cyan/15 ring-1 ring-cyan/30 grid place-items-center mx-auto mb-4">
                    <MapPin className="size-10 text-cyan" />
                  </div>
                  <h2 className="font-heading text-2xl font-semibold mb-2">
                    Interactive Map
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Mapbox integration arrives in Week 2. The map will show
                    landmarks, restaurants, and hotels with GPS auto-play.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Audio player (sticky bottom) */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(95%,800px)] glass rounded-2xl p-4 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-muted shrink-0 grid place-items-center">
              <MapPin className="size-5 text-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                Now Playing — Landmark History
              </p>
              <p className="font-heading text-sm font-semibold truncate">
                The Story of Po-i-Kalyan
              </p>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-cyan rounded-full" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground shrink-0 hidden sm:block">
              02:45 / 04:12
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
