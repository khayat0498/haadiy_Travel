"use client";

import { useTheme } from "@/components/providers";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-full grid place-items-center hover:bg-foreground/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-4 text-foreground" strokeWidth={2.2} />
      ) : (
        <Moon className="size-4 text-foreground" strokeWidth={2.2} />
      )}
    </button>
  );
}
