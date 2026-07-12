"use client";

import { MapCarousel } from "@/registry/map/map-carousel";

export default function MapCarouselDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MapCarousel />
      <MapCarousel>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <MapCarousel.Content />
        </div>
      </MapCarousel>
    </div>
  );
}
