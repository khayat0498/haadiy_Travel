"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

const AUTOPLAY_MS = 4500;

export function LandmarkGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Auto-slide: advance every AUTOPLAY_MS while not paused, not fullscreen, and >1 image.
  // Depending on `index` resets the timer whenever the user manually navigates.
  useEffect(() => {
    if (images.length <= 1 || paused || fullscreen) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [images.length, paused, fullscreen, index, next]);

  // Keyboard: arrows + Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
        return;
      }
      if (images.length <= 1) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, prev, next, fullscreen]);

  // Lock body scroll while fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [fullscreen]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  if (images.length === 0) return null;

  const single = images.length === 1;

  return (
    <>
      <div>
        {/* Main image */}
        <div
          className="group relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-border"
          onTouchStart={(e) => {
            setPaused(true);
            handleTouchStart(e);
          }}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="View full screen"
            className="absolute inset-0 z-10 cursor-zoom-in"
          >
            <span className="sr-only">Open fullscreen</span>
          </button>

          {/* Sliding strip — all images side-by-side, translated horizontally */}
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="relative w-full h-full shrink-0">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Expand hint */}
          <span className="pointer-events-none absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white ring-1 ring-white/15 opacity-90">
            <Expand className="size-3" strokeWidth={2.2} />
            Tap to expand
          </span>

          {!single && (
            <>
              {/* Counter */}
              <div className="pointer-events-none absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white ring-1 ring-white/15 tabular-nums">
                {index + 1} / {images.length}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-10 md:size-11 rounded-full bg-black/45 backdrop-blur-md ring-1 ring-white/15 grid place-items-center text-white hover:bg-black/65 transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="size-5" strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-10 md:size-11 rounded-full bg-black/45 backdrop-blur-md ring-1 ring-white/15 grid place-items-center text-white hover:bg-black/65 transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="size-5" strokeWidth={2.2} />
              </button>
            </>
          )}
        </div>

        {!single && (
          <>
            {/* Mobile: dots */}
            <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
              {images.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-cyan"
                      : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Desktop: thumbnails */}
            <div className="hidden md:flex items-center gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, i) => {
                const active = i === index;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={active}
                    className={`relative aspect-[4/3] w-20 shrink-0 rounded-lg overflow-hidden ring-2 transition-all ${
                      active
                        ? "ring-cyan opacity-100"
                        : "ring-transparent opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
          onClick={() => setFullscreen(false)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm tabular-nums">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreen(false);
              }}
              aria-label="Close fullscreen"
              className="size-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors"
            >
              <X className="size-5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Image area */}
          <div
            className="flex-1 relative flex items-center justify-center px-4 pb-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={alt}
              className="max-h-full max-w-full object-contain select-none"
              draggable={false}
            />

            {!single && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur grid place-items-center text-white transition-colors"
                >
                  <ChevronLeft className="size-6" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur grid place-items-center text-white transition-colors"
                >
                  <ChevronRight className="size-6" strokeWidth={2.2} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails strip — desktop */}
          {!single && (
            <div
              className="hidden md:flex items-center justify-center gap-2 px-4 pb-4 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => {
                const active = i === index;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`relative aspect-[4/3] w-20 shrink-0 rounded-lg overflow-hidden ring-2 transition-all ${
                      active
                        ? "ring-cyan opacity-100"
                        : "ring-transparent opacity-50 hover:opacity-90"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Mobile dots */}
          {!single && (
            <div
              className="flex md:hidden items-center justify-center gap-1.5 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-cyan"
                      : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
