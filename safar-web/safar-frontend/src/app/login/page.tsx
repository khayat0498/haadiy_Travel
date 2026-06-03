import Link from "next/link";
import { SafarLogo } from "@/components/safar/SafarLogo";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center justify-center mb-8 group"
        >
          <SafarLogo className="h-20 md:h-40 w-auto transition-transform group-hover:scale-105" priority />
        </Link>

        <div className="rounded-2xl ring-1 ring-border bg-card p-7">
          <h1 className="font-heading text-2xl font-semibold mb-1 text-center">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Continue your Silk Road journey
          </p>

          <form className="space-y-4">
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
                placeholder="ali@safar.uz or +998 90 ..."
                className="w-full h-11 px-4 rounded-xl ring-1 ring-border bg-background focus:ring-2 focus:ring-cyan/50 outline-none transition"
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
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl ring-1 ring-border bg-background focus:ring-2 focus:ring-cyan/50 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground font-medium transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-muted-foreground">
            <Link href="/forgot" className="hover:text-foreground">
              Forgot password?
            </Link>
            <span className="mx-2">·</span>
            <Link href="/signup" className="hover:text-foreground">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
