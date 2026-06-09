"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "ar", label: "AR", name: "العربية", flag: "🇸🇦" },
];

export function LangSwitcher() {
  const [active, setActive] = useState("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full ring-1 ring-border bg-card/50 hover:bg-card hover:ring-foreground/30 text-sm font-medium transition-all"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          className={`size-3.5 opacity-60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 w-48 rounded-xl ring-1 ring-border bg-popover shadow-xl z-50 p-1.5"
        >
          {LANGUAGES.map((l) => {
            const isActive = l.code === active;
            return (
              <button
                role="menuitem"
                type="button"
                key={l.code}
                onClick={() => {
                  setActive(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "hover:bg-foreground/5 text-foreground/90"
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1 text-left">{l.name}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {l.label}
                </span>
                {isActive && <Check className="size-3.5" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
