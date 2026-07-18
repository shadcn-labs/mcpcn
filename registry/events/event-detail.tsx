"use client";

import {
  BadgeCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
} from "lucide-react";
import {
  createContext,
  createElement,
  Suspense,
  useContext,
  useState,
} from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  EventSignalBadge,
  formatNumber,
  LazyLeafletMap,
  MapPlaceholder,
} from "./shared";
import type { EventDetails } from "./types";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface EventDetailContextValue {
  currentImageIndex: number;
  event: EventDetails;
  images: string[];
  isSaved: boolean;
  nextImage: () => void;
  onBack?: () => void;
  onContact?: (organizer: EventDetails["organizer"]) => void;
  onFollow?: (organizer: EventDetails["organizer"]) => void;
  onGetTickets?: (event: EventDetails) => void;
  onSave?: (event: EventDetails) => void;
  onShare?: (event: EventDetails) => void;
  previousImage: () => void;
  save: () => void;
  showAiMatch: boolean;
  showMap: boolean;
}

const EventDetailContext = createContext<EventDetailContextValue | null>(null);

export const useEventDetail = () => {
  const context = useContext(EventDetailContext);
  if (!context) {
    throw new Error("EventDetail components must be used within EventDetail");
  }
  return context;
};

const DEFAULT_EVENT: EventDetails = {
  aiSummary: "Raw, unfiltered techno in an authentic warehouse setting.",
  attendeesCount: 537,
  category: "Nightlife",
  city: "Houston, TX",
  description:
    "Experience the raw energy of underground techno with industrial beats and immersive visuals.",
  endDateTime: "2026-08-23T04:00:00Z",
  eventSignal: "going-fast",
  goodToKnow: {
    ageRestriction: "21+",
    doorsOpen: "7:00 PM",
    dressCode: "Casual",
    duration: "2 hours",
    parking: "Limited parking",
    showtime: "7:30 PM",
  },
  images: [
    "https://picsum.photos/seed/event-detail-1/800/450",
    "https://picsum.photos/seed/event-detail-2/800/450",
  ],
  organizer: {
    eventsCount: 154,
    followers: 1200,
    hostingYears: 8,
    image: "https://picsum.photos/seed/midnight-lovers/80/80",
    name: "Midnight Lovers",
    rating: 4.5,
    reviewCount: 1067,
    verified: true,
  },
  priceRange: "$15 - $30",
  startDateTime: "2026-08-22T22:00:00Z",
  tiers: [
    { available: 50, name: "General Admission", price: 15 },
    { available: 20, name: "VIP Access", price: 30 },
  ],
  title: "Sunglasses at Night: Underground Techno",
  venue: "The White Rabbit",
  venue_details: {
    address: "8827 Nasher Ave",
    city: "Houston TX",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    name: "The White Rabbit",
  },
  vibeTags: ["High energy", "Late night", "Underground"],
};

const formatEventDate = (start?: string, end?: string) => {
  if (!start) {
    return;
  }
  const startDate = new Date(start);
  const date = startDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const time = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });
  if (!end) {
    return `${date} · ${time}`;
  }
  const endTime = new Date(end).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });
  return `${date} · ${time} - ${endTime}`;
};

const getEventImages = (event: EventDetails) => {
  if (event.images?.length) {
    return event.images;
  }
  if (event.image) {
    return [event.image];
  }
  return [];
};

export interface EventDetailProps extends ComponentProps<"article"> {
  actions?: {
    onBack?: () => void;
    onContact?: (organizer: EventDetails["organizer"]) => void;
    onFollow?: (organizer: EventDetails["organizer"]) => void;
    onGetTickets?: (event: EventDetails) => void;
    onSave?: (event: EventDetails) => void;
    onShare?: (event: EventDetails) => void;
  };
  appearance?: {
    showAiMatch?: boolean;
    showMap?: boolean;
  };
  data?: {
    event?: EventDetails;
  };
}

export const EventDetailGallery = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { currentImageIndex, event, images, nextImage, previousImage } =
    useEventDetail();
  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden bg-muted sm:aspect-[21/9]",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {images[currentImageIndex] ? (
            <BlockImage
              alt={event.title ?? "Event"}
              className="size-full object-cover"
              src={images[currentImageIndex]}
            />
          ) : (
            <div className="size-full bg-muted" />
          )}
          {images.length > 1 && (
            <>
              <Button
                aria-label="Previous image"
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full"
                onClick={previousImage}
                size="icon"
                variant="secondary"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                aria-label="Next image"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full"
                onClick={nextImage}
                size="icon"
                variant="secondary"
              >
                <ChevronRight className="size-4" />
              </Button>
              <span className="absolute right-3 bottom-3 rounded-full bg-black/70 px-2 py-1 text-white text-xs">
                {currentImageIndex + 1} / {images.length}
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const EventDetailActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event, isSaved, onShare, save } = useEventDetail();
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children ?? (
        <>
          <Button
            aria-label="Share event"
            onClick={() => onShare?.(event)}
            size="icon"
            variant="outline"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            aria-label="Save event"
            onClick={save}
            size="icon"
            variant="outline"
          >
            <Heart className={cn("size-4", isSaved && "fill-current")} />
          </Button>
        </>
      )}
    </div>
  );
};

export const EventDetailHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"header">) => {
  const { event } = useEventDetail();
  const date = formatEventDate(event.startDateTime, event.endDateTime);
  return (
    <header className={className} {...props}>
      {children ?? (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {event.category && (
                  <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    {event.category}
                  </span>
                )}
                {event.eventSignal && (
                  <EventSignalBadge signal={event.eventSignal} />
                )}
              </div>
              {event.title && (
                <h1 className="mt-2 font-bold text-2xl leading-tight sm:text-3xl">
                  {event.title}
                </h1>
              )}
            </div>
            <EventDetailActions />
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground text-sm">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {date}
              </span>
            )}
            {event.venue && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {event.venue}
              </span>
            )}
            {event.attendeesCount !== undefined && (
              <span className="flex items-center gap-1.5">
                <Users className="size-4" />
                {formatNumber(event.attendeesCount)} going
              </span>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export const EventDetailDescription = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event, showAiMatch } = useEventDetail();
  return (
    <section className={cn("space-y-4", className)} {...props}>
      {children ?? (
        <>
          {showAiMatch && event.aiSummary && (
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="font-medium text-sm">Why this matches</p>
              <p className="mt-1 text-muted-foreground text-sm">
                {event.aiSummary}
              </p>
            </div>
          )}
          {event.description && (
            <div>
              <h2 className="font-semibold text-lg">About this event</h2>
              <p className="mt-2 whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
          {event.vibeTags && event.vibeTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.vibeTags.map((tag) => (
                <span
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export const EventDetailOrganizer = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event, onContact, onFollow } = useEventDetail();
  const { organizer } = event;
  if (!organizer) {
    return null;
  }
  return (
    <section className={cn("rounded-lg border p-4", className)} {...props}>
      {children ?? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {organizer.image && (
            <BlockImage
              alt={organizer.name ?? "Organizer"}
              className="size-12 rounded-full object-cover"
              src={organizer.image}
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              {organizer.name && (
                <h2 className="font-semibold">{organizer.name}</h2>
              )}
              {organizer.verified && (
                <BadgeCheck className="size-4 text-blue-500" />
              )}
            </div>
            {organizer.rating !== undefined && (
              <p className="flex items-center gap-1 text-muted-foreground text-sm">
                <Star className="size-3.5 fill-current text-yellow-500" />
                {organizer.rating}
                {organizer.reviewCount !== undefined &&
                  ` · ${formatNumber(organizer.reviewCount)} reviews`}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onContact?.(organizer)}
              size="sm"
              variant="outline"
            >
              Contact
            </Button>
            <Button onClick={() => onFollow?.(organizer)} size="sm">
              Follow
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export const EventDetailMap = ({
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event, showMap } = useEventDetail();
  const coordinates = event.venue_details?.coordinates ?? event.coordinates;
  if (!(showMap && coordinates)) {
    return null;
  }
  const center: [number, number] = [coordinates.lat, coordinates.lng];
  return (
    <section
      className={cn("overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <div className="border-b p-4">
        <h2 className="font-semibold">Location</h2>
        <p className="text-muted-foreground text-sm">
          {[event.venue_details?.address, event.venue_details?.city]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>
      <div className="h-64">
        <Suspense fallback={<MapPlaceholder />}>
          <LazyLeafletMap
            center={center}
            renderMarkers={({ L, Marker }) => (
              <Marker
                icon={L.divIcon({
                  className: "event-location-marker",
                  html: '<div style="width:32px;height:32px;border-radius:9999px;background:#18181b;border:4px solid white;box-shadow:0 2px 8px rgba(0,0,0,.25)"></div>',
                  iconAnchor: [16, 16],
                  iconSize: [32, 32],
                })}
                position={center}
              />
            )}
            scrollWheelZoom={false}
            zoom={14}
          />
        </Suspense>
      </div>
    </section>
  );
};

export const EventDetailTickets = ({
  children,
  className,
  ...props
}: ComponentProps<"aside">) => {
  const { event, onGetTickets } = useEventDetail();
  return (
    <aside className={cn("rounded-lg border p-4", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs">Tickets from</p>
              <p className="font-semibold text-lg">
                {event.priceRange ?? "See tickets"}
              </p>
            </div>
            <Button onClick={() => onGetTickets?.(event)}>Get tickets</Button>
          </div>
          {event.tiers && event.tiers.length > 0 && (
            <div className="mt-4 space-y-2 border-t pt-4">
              {event.tiers.map((tier) => (
                <div
                  className="flex items-center justify-between text-sm"
                  key={tier.name}
                >
                  <span>{tier.name}</span>
                  <span>${tier.price}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </aside>
  );
};

export const EventDetailContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={cn("space-y-6 p-4 sm:p-6", className)} {...props}>
    {children}
  </div>
);

const EventDetailRoot = ({
  actions,
  appearance,
  children,
  className,
  data,
  ...props
}: EventDetailProps & { children: React.ReactNode }) => {
  const event = data?.event ?? DEFAULT_EVENT;
  const images = getEventImages(event);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const context: EventDetailContextValue = {
    currentImageIndex,
    event,
    images,
    isSaved,
    nextImage: () =>
      setCurrentImageIndex((index) => (index + 1) % images.length),
    onBack: actions?.onBack,
    onContact: actions?.onContact,
    onFollow: actions?.onFollow,
    onGetTickets: actions?.onGetTickets,
    onSave: actions?.onSave,
    onShare: actions?.onShare,
    previousImage: () =>
      setCurrentImageIndex((index) =>
        index === 0 ? images.length - 1 : index - 1
      ),
    save: () => {
      setIsSaved((saved) => !saved);
      actions?.onSave?.(event);
    },
    showAiMatch: appearance?.showAiMatch ?? true,
    showMap: appearance?.showMap ?? true,
  };
  return (
    <EventDetailContext.Provider value={context}>
      <article
        className={cn("overflow-hidden rounded-xl border bg-card", className)}
        {...props}
      >
        {children}
      </article>
    </EventDetailContext.Provider>
  );
};

export const EventDetail = EventDetailRoot;
