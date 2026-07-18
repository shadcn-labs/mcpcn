"use client";

import type * as Leaflet from "leaflet";
import { MapPin } from "lucide-react";
import { lazy } from "react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

import type { EventSignal } from "./types";

export interface LeafletMarkerAttrs {
  position: [number, number];
  icon?: Leaflet.DivIcon | Leaflet.Icon;
  zIndexOffset?: number;
  eventHandlers?: {
    click?: () => void;
  };
}

export interface LazyLeafletMapConfig {
  center: [number, number];
  zoom: number;
  style?: React.CSSProperties;
  scrollWheelZoom?: boolean;
  tileUrl?: string;
  tileAttribution?: string;
  renderMarkers: (ctx: {
    Marker: ComponentType<LeafletMarkerAttrs>;
    L: typeof Leaflet;
  }) => React.ReactNode;
}

const EmptyLeafletMap: ComponentType<LazyLeafletMapConfig> = () => null;

export const LazyLeafletMap = lazy<ComponentType<LazyLeafletMapConfig>>(
  async () => {
    if (typeof window === "undefined") {
      return { default: EmptyLeafletMap };
    }

    const { MapContainer, TileLayer, Marker } = await import("react-leaflet");
    const leafletModule = await import("leaflet");
    const L = leafletModule.default;

    const LEAFLET_CSS_ID = "leaflet-css-1-9-4";
    if (
      typeof document !== "undefined" &&
      !document.querySelector(`#${LEAFLET_CSS_ID}`)
    ) {
      const link = document.createElement("link");
      link.id = LEAFLET_CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.append(link);
    }

    const LazyLeafletMapComponent = (props: LazyLeafletMapConfig) => {
      const tileUrl =
        props.tileUrl ??
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      const tileAttribution =
        props.tileAttribution ??
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

      return (
        <MapContainer
          center={props.center}
          zoom={props.zoom}
          style={props.style ?? { height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom={props.scrollWheelZoom ?? true}
        >
          <TileLayer attribution={tileAttribution} url={tileUrl} />
          {props.renderMarkers({
            L,
            Marker: Marker as ComponentType<LeafletMarkerAttrs>,
          })}
        </MapContainer>
      );
    };

    return { default: LazyLeafletMapComponent };
  }
);

export const formatNumber = (num: number): string =>
  num.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");

export const MapPlaceholder = () => (
  <div className="flex h-full items-center justify-center bg-muted/30">
    <div className="flex flex-col items-center gap-2 text-muted-foreground">
      <MapPin className="size-8" />
      <span className="text-sm">Loading map...</span>
    </div>
  </div>
);

export const EventSignalBadge = ({ signal }: { signal: EventSignal }) => {
  const config: Record<EventSignal, { label: string; className: string }> = {
    canceled: { className: "bg-gray-100 text-gray-700", label: "Canceled" },
    ended: { className: "bg-gray-100 text-gray-700", label: "Ended" },
    "few-tickets-left": {
      className: "bg-orange-100 text-orange-700",
      label: "Few Tickets Left",
    },
    "going-fast": {
      className: "bg-orange-100 text-orange-700",
      label: "Going Fast",
    },
    "just-added": {
      className: "bg-blue-100 text-blue-700",
      label: "Just Added",
    },
    popular: { className: "bg-pink-100 text-pink-700", label: "Popular" },
    postponed: {
      className: "bg-yellow-100 text-yellow-700",
      label: "Postponed",
    },
    "sales-end-soon": {
      className: "bg-red-100 text-red-700",
      label: "Sales end soon",
    },
  };

  const { label, className } = config[signal];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
        className
      )}
    >
      {label}
    </span>
  );
};
