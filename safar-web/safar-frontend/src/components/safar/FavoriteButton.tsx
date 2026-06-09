"use client";

import { useState, type MouseEvent } from "react";
import { Heart } from "lucide-react";

type Props = {
  label: string;
  className?: string;
};

export function FavoriteButton({ label, className = "" }: Props) {
  const [active, setActive] = useState(false);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setActive((v) => !v);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={active}
      className={`size-9 rounded-full bg-black/40 backdrop-blur-md ring-1 ring-white/15 grid place-items-center hover:bg-black/60 transition-colors ${className}`}
    >
      <Heart
        className={`size-4 transition-colors ${
          active ? "fill-red-500 text-red-500" : "text-white"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
