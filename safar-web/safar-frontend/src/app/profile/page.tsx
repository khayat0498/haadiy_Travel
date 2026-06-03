import Link from "next/link";
import { User, Download, Calendar, Gem } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="px-5 py-10">
      <div className="container max-w-xl mx-auto">
        {/* Avatar + name */}
        <div className="text-center mb-8">
          <span className="inline-flex size-20 rounded-full bg-gradient-to-br from-cyan/40 to-cyan/10 ring-2 ring-cyan/40 items-center justify-center mb-3">
            <User className="size-9 text-cyan" strokeWidth={1.8} />
          </span>
          <h1 className="font-heading text-2xl font-semibold mb-0.5">
            Guest Traveler
          </h1>
          <p className="text-sm text-muted-foreground">Free Plan</p>
        </div>

        {/* Unlock Premium card */}
        <div className="rounded-2xl ring-1 ring-gold/40 bg-card p-5 mb-6 glow-gold">
          <div className="flex items-center gap-3 mb-4">
            <span className="size-11 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 ring-1 ring-gold/40 grid place-items-center shrink-0">
              <Gem className="size-5 text-gold" strokeWidth={2} />
            </span>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Unlock Premium
              </h3>
              <p className="text-xs text-muted-foreground">
                Access all stories & features
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="block text-center w-full h-11 leading-[2.7rem] rounded-full bg-gold hover:bg-gold-glow text-accent-foreground font-medium transition-colors"
          >
            View Plans
          </Link>
        </div>

        {/* Offline downloads */}
        <section className="mb-6">
          <h2 className="inline-flex items-center gap-1.5 text-base font-semibold mb-3">
            <Download className="size-4 text-cyan" />
            Offline Downloads
          </h2>
          <div className="rounded-2xl ring-1 ring-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No downloads yet. Save stories for offline access!
            </p>
          </div>
        </section>

        {/* My bookings */}
        <section>
          <h2 className="inline-flex items-center gap-1.5 text-base font-semibold mb-3">
            <Calendar className="size-4 text-gold" />
            My Bookings
          </h2>
          <div className="rounded-2xl ring-1 ring-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No bookings yet. Explore tours, hotels & restaurants!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
