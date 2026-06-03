import Link from "next/link";
import { SafarLogo } from "./SafarLogo";
import { LangSwitcher } from "./LangSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60 backdrop-blur-xl">
      <div className="container max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <SafarLogo
            className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>
        <LangSwitcher />
      </div>
    </header>
  );
}
