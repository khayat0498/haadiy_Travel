import Link from "next/link";
import { SafarLogo } from "./SafarLogo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/explore" },
  { label: "Map", href: "/map" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(92%,1100px)]">
      <div className="glass rounded-3xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <SafarLogo className="h-8 md:h-16 w-auto transition-transform group-hover:scale-105" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground text-sm font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
