"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Map,
  Headphones,
  Download,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  LogOut,
  Gem,
} from "lucide-react";
import { mockCities } from "@/mocks/cities";

type Session = {
  email: string;
  name: string;
  loggedInAt: number;
};

const stats = [
  { label: "Stories Played", value: "7", icon: Headphones, accent: "cyan" as const },
  { label: "Downloads", value: "3", icon: Download, accent: "gold" as const },
  { label: "Cities Visited", value: "2", icon: Map, accent: "cyan" as const },
];

const recentActivity = [
  {
    id: "1",
    title: "Po-i-Kalyan Complex",
    city: "Bukhara",
    progress: 65,
    duration: "4:40",
  },
  {
    id: "2",
    title: "Ark Fortress",
    city: "Bukhara",
    progress: 100,
    duration: "3:20",
  },
  {
    id: "3",
    title: "Registan Square",
    city: "Samarkand",
    progress: 30,
    duration: "5:15",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("haadiy_auth");
    if (!raw) {
      router.replace("/login");
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      localStorage.removeItem("haadiy_auth");
      router.replace("/login");
      return;
    }
    setLoaded(true);
  }, [router]);

  function handleSignOut() {
    localStorage.removeItem("haadiy_auth");
    router.push("/login");
  }

  if (!loaded || !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
      </div>
    );
  }

  const firstName = session.name.split(" ")[0] ?? "Traveler";
  const featuredCities = mockCities
    .filter((c) => ["bukhara", "samarkand", "khiva"].includes(c.slug))
    .slice(0, 3);

  return (
    <div className="px-5 py-10 overflow-x-hidden">
      <div className="container max-w-5xl mx-auto">
        {/* Greeting */}
        <div className="flex items-start justify-between gap-3 mb-10">
          <div>
            <p className="text-gold text-[10px] uppercase tracking-[0.4em] mb-2">
              ✦ Welcome back ✦
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-semibold leading-tight">
              Salom,{" "}
              <span
                className="bg-clip-text text-transparent italic"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.92 0.18 86) 0%, oklch(0.78 0.16 70) 100%)",
                }}
              >
                {firstName}
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Continue your journey through the Silk Road
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full ring-1 ring-border bg-card/40 hover:bg-card/70 hover:ring-foreground/30 text-xs text-muted-foreground hover:text-foreground transition-all"
            aria-label="Sign out"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-10">
          {stats.map((s) => {
            const Icon = s.icon;
            const isCyan = s.accent === "cyan";
            return (
              <div
                key={s.label}
                className="rounded-2xl p-4 sm:p-5 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.24 0.03 200 / 60%), oklch(0.2 0.025 200 / 40%))",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <span
                  className="inline-flex size-9 rounded-xl items-center justify-center mb-3"
                  style={{
                    background: isCyan
                      ? "oklch(0.78 0.14 200 / 20%)"
                      : "oklch(0.85 0.16 86 / 20%)",
                    border: isCyan
                      ? "1px solid oklch(0.78 0.14 200 / 30%)"
                      : "1px solid oklch(0.85 0.16 86 / 30%)",
                  }}
                >
                  <Icon
                    className={`size-4 ${isCyan ? "text-cyan" : "text-gold"}`}
                    strokeWidth={2}
                  />
                </span>
                <div className="font-heading text-2xl sm:text-3xl font-semibold">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue listening */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="inline-flex items-center gap-2 font-heading text-xl font-semibold">
              <Clock className="size-5 text-cyan" />
              Continue Listening
            </h2>
            <Link
              href="/explore"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View all <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item) => (
              <Link
                key={item.id}
                href={`/landmarks/${item.id}`}
                className="group block rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.24 0.03 200 / 70%), oklch(0.2 0.025 200 / 50%))",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="size-11 rounded-xl bg-gradient-to-br from-cyan/30 to-cyan/10 ring-1 ring-cyan/30 grid place-items-center shrink-0">
                    <Headphones
                      className="size-5 text-cyan"
                      strokeWidth={1.8}
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <h3 className="font-medium text-sm truncate group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {item.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-muted-foreground">
                        {item.city}
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${item.progress}%`,
                            background:
                              item.progress === 100
                                ? "oklch(0.78 0.14 200)"
                                : "linear-gradient(90deg, oklch(0.78 0.14 200), oklch(0.85 0.16 86))",
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured cities */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="inline-flex items-center gap-2 font-heading text-xl font-semibold">
              <TrendingUp className="size-5 text-gold" />
              Continue Exploring
            </h2>
            <Link
              href="/explore"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              All cities <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredCities.map((city) => (
              <Link
                key={city.uuid}
                href={`/cities/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] transition-all hover:-translate-y-1"
                style={{
                  border: "1px solid oklch(1 0 0 / 8%)",
                  boxShadow: "0 20px 50px -20px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                  style={{ backgroundImage: `url(${city.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <p className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-1">
                    {city.landmarkCount}+ Landmarks
                  </p>
                  <h3 className="font-heading text-lg font-semibold group-hover:text-gold-glow transition-colors">
                    {city.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mb-10">
          <h2 className="inline-flex items-center gap-2 font-heading text-xl font-semibold mb-4">
            <Sparkles className="size-5 text-cyan" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/map"
              className="group rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.78 0.14 200 / 18%), oklch(0.78 0.14 200 / 6%))",
                border: "1px solid oklch(0.78 0.14 200 / 25%)",
              }}
            >
              <Map
                className="size-6 text-cyan mb-3"
                strokeWidth={1.8}
              />
              <h3 className="font-medium mb-0.5">Open Map</h3>
              <p className="text-xs text-muted-foreground">
                Find landmarks nearby
              </p>
            </Link>

            <Link
              href="/ai"
              className="group rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.85 0.16 86 / 18%), oklch(0.85 0.16 86 / 6%))",
                border: "1px solid oklch(0.85 0.16 86 / 25%)",
              }}
            >
              <Sparkles
                className="size-6 text-gold mb-3"
                strokeWidth={1.8}
              />
              <h3 className="font-medium mb-0.5">Ask Haadiy AI</h3>
              <p className="text-xs text-muted-foreground">
                Get answers instantly
              </p>
            </Link>
          </div>
        </section>

        {/* Premium upsell */}
        <section className="mb-10">
          <div
            className="rounded-3xl p-6 md:p-7 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.85 0.16 86 / 18%), oklch(0.78 0.16 70 / 8%))",
              border: "1px solid oklch(0.85 0.16 86 / 30%)",
              boxShadow:
                "0 20px 50px -20px oklch(0.85 0.16 86 / 30%), inset 0 1px 0 oklch(1 0 0 / 10%)",
            }}
          >
            <span
              aria-hidden
              className="absolute -top-16 -right-16 size-48 rounded-full blur-3xl opacity-60"
              style={{ background: "oklch(0.85 0.16 86 / 40%)" }}
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <span
                className="inline-flex size-14 rounded-2xl items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.92 0.18 86), oklch(0.78 0.16 70))",
                  boxShadow: "0 8px 24px -4px oklch(0.85 0.16 86 / 50%)",
                }}
              >
                <Gem
                  className="size-6"
                  style={{ color: "oklch(0.18 0.02 200)" }}
                  strokeWidth={2}
                />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-semibold mb-1">
                  Unlock Premium
                </h3>
                <p className="text-sm text-muted-foreground">
                  Access all 50+ stories, offline downloads, and exclusive
                  expert content
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full font-medium text-sm transition-all whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.18 86), oklch(0.78 0.16 70))",
                  color: "oklch(0.18 0.02 200)",
                  boxShadow:
                    "0 8px 24px -6px oklch(0.85 0.16 86 / 50%), inset 0 1px 0 oklch(0.95 0.1 86)",
                }}
              >
                View Plans
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sign out (mobile only) */}
        <div className="sm:hidden flex justify-center pt-2">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full ring-1 ring-border bg-card/40 hover:bg-card/70 text-xs text-muted-foreground hover:text-foreground transition-all"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
