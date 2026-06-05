"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Dynamic import with ssr:false — only allowed in Client Components in Next 16.
// Leaflet uses `window`, so it cannot be evaluated on the server.
const SafarMapInner = dynamic(
  () => import("./SafarMapInner").then((m) => m.SafarMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl bg-card ring-1 ring-border animate-pulse h-[400px]" />
    ),
  },
);

export type { MapMarker } from "./SafarMapInner";

export function SafarMap(props: ComponentProps<typeof SafarMapInner>) {
  return <SafarMapInner {...props} />;
}
