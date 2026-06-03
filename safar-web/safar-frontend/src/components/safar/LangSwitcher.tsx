"use client";

import { useState } from "react";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "ar", label: "AR" },
];

export function LangSwitcher() {
  const [active, setActive] = useState("en");

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === active;
        return (
          <button
            type="button"
            key={lang.code}
            onClick={() => setActive(lang.code)}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              isActive
                ? "bg-gold/20 text-gold ring-1 ring-gold/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
