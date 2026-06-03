import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { Header } from "@/components/safar/Header";
import { Footer } from "@/components/safar/Footer";
import { mockPlans } from "@/mocks/plans";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
              Choose Your Journey
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              One-time purchases. No subscriptions. Unlock the Silk Road on
              your terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {mockPlans.map((plan, i) => {
              const isFeatured = i === 2;
              return (
                <div
                  key={plan.uuid}
                  className={`relative rounded-2xl p-6 ring-1 transition-all ${
                    isFeatured
                      ? "ring-cyan/60 bg-card glow-cyan"
                      : "ring-border bg-card hover:ring-cyan/30"
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-2xl font-semibold mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-heading text-4xl font-bold">
                      ${(plan.priceUsdCents / 100).toFixed(2)}
                    </span>
                    {plan.durationHours && (
                      <span className="text-sm text-muted-foreground">
                        / {plan.durationHours}h
                      </span>
                    )}
                    {!plan.durationHours && (
                      <span className="text-sm text-muted-foreground">
                        / lifetime
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    {plan.description}
                  </p>

                  <Link
                    href={`/checkout/${plan.uuid}`}
                    className={`block text-center h-11 leading-[2.7rem] rounded-full font-medium transition-colors mb-6 ${
                      isFeatured
                        ? "bg-gold hover:bg-gold-glow text-accent-foreground"
                        : "bg-cyan hover:bg-cyan-glow text-primary-foreground"
                    }`}
                  >
                    {isFeatured ? "Upgrade Now" : "Get Started"}
                  </Link>

                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Check className="size-4 text-cyan shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs text-muted-foreground">
                    {plan.priceUzs.toLocaleString()} UZS
                  </p>
                </div>
              );
            })}
          </div>

          {/* Payment methods */}
          <div className="rounded-2xl p-6 ring-1 ring-border bg-card max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="size-4 text-cyan" />
              <h3 className="font-semibold">Secure Checkout via Uzum</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                "Visa / Mastercard",
                "Uzcard / Humo",
                "Apple Pay",
                "Google Pay",
                "Click",
                "Payme",
              ].map((m) => (
                <div
                  key={m}
                  className="px-4 py-2.5 rounded-lg ring-1 ring-border bg-background/50 text-center text-foreground/85"
                >
                  {m}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              SSL encrypted. PCI-DSS compliant. No card data stored on our
              servers.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
