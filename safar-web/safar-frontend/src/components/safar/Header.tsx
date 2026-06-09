import Link from "next/link";
import { SafarLogo } from "./SafarLogo";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Maps" },
  { href: "/ai", label: "Ask AI" },
  { href: "/book", label: "Book" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60 backdrop-blur-xl">
      <div className="container max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center group shrink-0">
          <SafarLogo
            className="h-16 md:h-20 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
