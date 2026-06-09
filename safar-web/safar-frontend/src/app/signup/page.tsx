import Image from "next/image";
import Link from "next/link";
import { SafarLogo } from "@/components/safar/SafarLogo";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background image — overflows on mobile to preserve aspect ratio */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-[40%] -right-[20%] h-full md:left-0 md:right-0">
          <Image
            src="/6745544_original.jpg"
            alt=""
            fill
            priority
            className="object-cover blur-sm scale-105"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.02 200 / 22%), oklch(0.16 0.02 200 / 15%) 50%, oklch(0.18 0.02 200 / 30%))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, transparent, oklch(0.1 0.02 200 / 25%) 95%)",
          }}
        />
      </div>

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center mb-8 group"
        >
          <SafarLogo
            className="h-20 md:h-32 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        <div
          className="rounded-3xl p-7 md:p-8"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.24 0.03 200 / 70%), oklch(0.18 0.025 200 / 55%))",
            border: "1px solid oklch(1 0 0 / 10%)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 oklch(1 0 0 / 8%)",
          }}
        >
          <h1 className="font-heading text-2xl md:text-3xl font-semibold mb-1 text-center text-white">
            Begin Your Journey
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-7">
            Join thousands exploring the Silk Road
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ali Karimov"
                className="w-full h-11 px-4 rounded-xl ring-1 ring-border bg-background/50 backdrop-blur focus:ring-2 focus:ring-cyan/50 outline-none transition"
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
              >
                Email or phone
              </label>
              <input
                id="identifier"
                type="text"
                placeholder="ali@haadiy.com or +998 90 ..."
                className="w-full h-11 px-4 rounded-xl ring-1 ring-border bg-background/50 backdrop-blur focus:ring-2 focus:ring-cyan/50 outline-none transition"
                autoComplete="username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="w-full h-11 px-4 rounded-xl ring-1 ring-border bg-background/50 backdrop-blur focus:ring-2 focus:ring-cyan/50 outline-none transition"
                autoComplete="new-password"
                minLength={8}
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed pt-1 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 size-4 rounded border-border accent-cyan cursor-pointer"
                required
              />
              <span>
                I agree to Haadiy&apos;s{" "}
                <Link
                  href="/terms"
                  className="text-foreground/80 underline underline-offset-2 hover:text-foreground"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-foreground/80 underline underline-offset-2 hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="group relative w-full h-11 rounded-full font-medium transition-all overflow-hidden mt-2"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.92 0.18 86), oklch(0.78 0.16 70))",
                color: "oklch(0.18 0.02 200)",
                boxShadow:
                  "0 12px 30px -8px oklch(0.85 0.16 86 / 50%), inset 0 1px 0 oklch(0.95 0.1 86)",
              }}
            >
              <span className="relative z-10">Create Account</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              or
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gold font-medium hover:text-gold-glow transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
