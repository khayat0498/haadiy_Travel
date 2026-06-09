import { SafarMap, type MapMarker } from "@/components/safar/maps/SafarMap";
import { mockLandmarks } from "@/mocks/landmarks";

export default function MapPage() {
  const markers: MapMarker[] = mockLandmarks.map((l) => ({
    id: l.uuid,
    name: l.name,
    position: [l.lat, l.lng],
    href: `/landmarks/${l.slug}`,
    description: l.shortDescription,
  }));

  const center: [number, number] =
    markers.length > 0
      ? [
          markers.reduce((s, m) => s + m.position[0], 0) / markers.length,
          markers.reduce((s, m) => s + m.position[1], 0) / markers.length,
        ]
      : [39.65, 66.97];

  return (
    <div className="fixed left-0 right-0 top-[88px] bottom-[60px] md:top-[104px] md:bottom-0 z-0">
      <SafarMap
        center={center}
        zoom={6}
        markers={markers}
        height="100%"
        tileStyle="light"
        className="!rounded-none !ring-0"
      />
    </div>
  );
}
