"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, MessageCircle, BookOpen, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Maps", icon: Map },
  { href: "/ai", label: "Ask AI", icon: MessageCircle },
  { href: "/book", label: "Book", icon: BookOpen },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/60 backdrop-blur-xl">
      <div className="container max-w-2xl mx-auto px-2 flex items-stretch justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                isActive ? "text-cyan" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className="size-5"
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  isActive ? "" : "opacity-80"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
