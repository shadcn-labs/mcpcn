"use client";

import {
  BadgeCheck,
  Bike,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Footprints,
  Heart,
  MapPin,
  Share2,
  Star,
  Timer,
  Train,
  Car,
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

type EventOrganizer = NonNullable<EventDetails["organizer"]>;

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

const getDateAt = (daysFromNow: number, hour: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const DEFAULT_EVENT: EventDetails = {
  aiSummary: "Raw, unfiltered techno in an authentic warehouse setting.",
  attendeesCount: 537,
  category: "Nightlife",
  city: "Houston, TX",
  description:
    "Experience the raw energy of underground techno. Industrial beats, immersive visuals, and a crowd that lives for the music.",
  endDateTime: getDateAt(3, 4),
  eventSignal: "going-fast",
  faq: [
    {
      answer: "No refunds. Tickets are transferable.",
      question: "What is the refund policy?",
    },
    {
      answer: "Open 2 hours before event.",
      question: "When do doors open?",
    },
    {
      answer: "Limited, leave early to avoid long queues.",
      question: "Is there parking?",
    },
  ],
  friendsGoing: [
    {
      avatar: "https://picsum.photos/seed/event-friend-alex/40/40",
      name: "Alex",
    },
    {
      avatar: "https://picsum.photos/seed/event-friend-sam/40/40",
      name: "Sam",
    },
  ],
  goodToKnow: {
    ageRestriction: "21+",
    doorsOpen: "7:00 PM",
    dressCode: "Casual",
    duration: "2 hours",
    parking: "Limited, leave early to avoid long queues",
    showtime: "7:30 PM",
  },
  images: [
    "https://picsum.photos/seed/event-detail-1/800/600",
    "https://picsum.photos/seed/event-detail-2/800/600",
    "https://picsum.photos/seed/event-detail-3/800/600",
  ],
  lineup: ["Amelie Lens", "I Hate Models", "FJAAK"],
  neighborhood: "The Woodlands",
  organizer: {
    eventsCount: 154,
    followers: 1200,
    hostingYears: 8,
    image: "https://picsum.photos/seed/midnight-lovers/80/80",
    name: "Midnight Lovers",
    rating: 4.5,
    responseRate: "very responsive",
    reviewCount: 1067,
    trackRecord: "great",
    verified: true,
  },
  policies: {
    entry: "Open 2 hours before event",
    idRequired: true,
    refund: "No refunds. Tickets are transferable.",
    securityOnSite: true,
  },
  priceRange: "$15 - $30",
  relatedTags: ["Houston Events", "Texas Nightlife", "Techno Parties"],
  startDateTime: getDateAt(2, 22),
  tiers: [
    { available: 50, name: "General Admission", price: 15 },
    {
      available: 20,
      benefits: ["Skip the line", "Exclusive lounge"],
      name: "VIP Access",
      price: 30,
    },
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

const formatEventDateTime = (startDateTime: string, endDateTime?: string) => {
  const start = new Date(startDateTime);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  };
  const startTime = start.toLocaleTimeString("en-US", timeOptions);
  let datePrefix: string;

  if (startDay.getTime() === today.getTime()) {
    datePrefix = "Today";
  } else if (startDay.getTime() === tomorrow.getTime()) {
    datePrefix = "Tomorrow";
  } else {
    datePrefix = start.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  }

  if (!endDateTime) {
    return `${datePrefix} · ${startTime}`;
  }

  const endTime = new Date(endDateTime).toLocaleTimeString(
    "en-US",
    timeOptions
  );
  return `${datePrefix} · ${startTime} - ${endTime}`;
};

const getEventImages = (event: EventDetails) => {
  if (event.images?.length) {
    return event.images;
  }
  return event.image ? [event.image] : [];
};

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
  onShare?: (event: EventDetails) => void;
  previousImage: () => void;
  save: () => void;
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
  const {
    currentImageIndex,
    event,
    images,
    isSaved,
    nextImage,
    onBack,
    onShare,
    previousImage,
    save,
  } = useEventDetail();

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden bg-muted",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {images[currentImageIndex] ? (
            <BlockImage
              alt={event.title || "Event image"}
              className="size-full object-cover"
              src={images[currentImageIndex]}
            />
          ) : (
            <div className="size-full bg-muted" />
          )}

          <div className="absolute inset-0 flex items-center justify-between p-2">
            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  onClick={previousImage}
                  type="button"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  aria-label="Next image"
                  className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  onClick={nextImage}
                  type="button"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            <button
              aria-label="Share event"
              className="rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
              onClick={() => onShare?.(event)}
              type="button"
            >
              <Share2 className="size-5" />
            </button>
            <button
              aria-label={isSaved ? "Remove from saved" : "Save event"}
              className="rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
              onClick={save}
              type="button"
            >
              <Heart
                data-apps-sdk-fill=""
                data-apps-sdk-status={isSaved ? "danger" : undefined}
                className={cn("size-5", isSaved && "fill-red-500 text-red-500")}
              />
            </button>
          </div>

          {onBack && (
            <button
              aria-label="Go back"
              className="absolute top-3 left-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              onClick={onBack}
              type="button"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-white text-xs">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const EventDetailHeaderIntro = () => {
  const { event } = useEventDetail();
  return (
    <>
      {event.eventSignal && (
        <div>
          <EventSignalBadge signal={event.eventSignal} />
        </div>
      )}
      {event.category && (
        <span className="inline-block rounded-full bg-muted px-3 py-1 font-medium text-sm">
          {event.category}
        </span>
      )}
      {event.title && (
        <h1 className="font-bold text-2xl leading-tight">{event.title}</h1>
      )}
      {event.organizer && (
        <div className="flex items-center gap-2 text-sm">
          {event.organizer.verified && (
            <BadgeCheck
              className="size-4 text-blue-500"
              data-apps-sdk-status="info"
            />
          )}
          {event.organizer.name && (
            <span className="font-medium">{event.organizer.name}</span>
          )}
          {(event.organizer.rating !== undefined ||
            event.organizer.reviewCount !== undefined) && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <Star
                  className="size-4 fill-current text-yellow-500"
                  data-apps-sdk-status="warning"
                />
                {event.organizer.rating}
                {event.organizer.reviewCount !== undefined &&
                  ` (${formatNumber(event.organizer.reviewCount)})`}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

const EventDetailHeaderLocation = () => {
  const { event } = useEventDetail();
  if (!(event.venue_details?.name || event.venue || event.city)) {
    return null;
  }
  return (
    <div className="flex items-start gap-2 text-muted-foreground text-sm">
      <MapPin className="mt-0.5 size-4 shrink-0" />
      <span>
        {[event.venue_details?.name || event.venue, event.city]
          .filter(Boolean)
          .join(" · ")}
        {event.neighborhood && ` (${event.neighborhood})`}
      </span>
    </div>
  );
};

const EventDetailHeaderAttendance = () => {
  const { event } = useEventDetail();
  return (
    <div className="flex items-center gap-4">
      {event.priceRange && (
        <div>
          <div className="font-semibold text-lg">{event.priceRange}</div>
        </div>
      )}
      {event.attendeesCount !== undefined && (
        <div className="flex items-center gap-2">
          {event.friendsGoing && event.friendsGoing.length > 0 && (
            <div className="flex -space-x-2">
              {event.friendsGoing
                .slice(0, 3)
                .map((friend) =>
                  friend.avatar ? (
                    <BlockImage
                      alt={friend.name || "Friend"}
                      className="size-6 rounded-full border-2 border-background"
                      key={friend.name || friend.avatar}
                      src={friend.avatar}
                    />
                  ) : null
                )}
            </div>
          )}
          <span className="text-muted-foreground text-sm">
            {event.friendsGoing &&
              event.friendsGoing.length > 0 &&
              `+ ${event.friendsGoing.length} friends · `}
            {event.attendeesCount} going
          </span>
        </div>
      )}
    </div>
  );
};

const EventDetailHeaderTags = () => {
  const { event } = useEventDetail();
  if (!event.vibeTags?.length) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {event.vibeTags.map((tag) => (
        <span className="rounded-full border px-3 py-1 text-sm" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export const EventDetailHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"header">) => (
  <header className={cn("contents", className)} {...props}>
    {children ?? (
      <>
        <EventDetailHeaderIntro />
        <EventDetailHeaderLocation />
        <EventDetailHeaderAttendance />
        <EventDetailHeaderTags />
      </>
    )}
  </header>
);

export const EventDetailActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event, onGetTickets } = useEventDetail();
  return (
    <div
      className={cn("flex gap-3", className)}
      data-apps-sdk-actions=""
      {...props}
    >
      {children ?? (
        <>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => onGetTickets?.(event)}
          >
            Get tickets
          </Button>
          <Button className="flex-1" variant="outline">
            Invite friends
          </Button>
        </>
      )}
    </div>
  );
};

export const EventDetailAiMatch = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={cn("rounded-lg bg-muted/50 p-4", className)} {...props}>
      {children ?? (
        <>
          <h3 className="font-semibold">Why this matches your vibe</h3>
          <p className="mt-1 text-muted-foreground text-sm">
            {event.aiSummary}
          </p>
        </>
      )}
    </section>
  );
};

export const EventDetailDescription = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">About</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            {event.description}
          </p>
        </>
      )}
    </section>
  );
};

export const EventDetailLineup = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h3 className="font-medium text-muted-foreground text-sm">Lineup</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.lineup?.map((artist) => (
              <span
                className="rounded-full border px-3 py-1 text-sm"
                key={artist}
              >
                {artist}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export const EventDetailGoodToKnow = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">Good to know</h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/50 p-3">
              <h4 className="font-medium text-sm">Highlights</h4>
              <div className="mt-2 space-y-1.5 text-muted-foreground text-sm">
                {event.goodToKnow?.duration && (
                  <div className="flex items-center gap-2">
                    <Timer className="size-4" />
                    {event.goodToKnow.duration}
                  </div>
                )}
                {event.locationType !== "online" && (
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    In person
                  </div>
                )}
              </div>
            </div>
            {event.policies?.refund && (
              <div className="rounded-lg bg-muted/50 p-3">
                <h4 className="font-medium text-sm">Refund Policy</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  {event.policies.refund}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

const travelOptions = [
  { icon: Car, label: "Driving" },
  { icon: Train, label: "Public transport" },
  { icon: Bike, label: "Biking" },
  { icon: Footprints, label: "Walking" },
];

export const EventDetailMap = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event, showMap } = useEventDetail();
  const venue = event.venue_details;
  const coordinates = venue?.coordinates;
  const center: [number, number] | undefined = coordinates
    ? [coordinates.lat, coordinates.lng]
    : undefined;

  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">Location</h2>
          <div className="mt-3">
            {venue?.name && <p className="font-medium">{venue.name}</p>}
            {venue?.address && (
              <p className="text-muted-foreground text-sm">{venue.address}</p>
            )}
            {venue?.city && (
              <p className="text-muted-foreground text-sm">{venue.city}</p>
            )}
          </div>

          {showMap && center && (
            <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-muted">
              <Suspense fallback={<MapPlaceholder />}>
                <LazyLeafletMap
                  center={center}
                  renderMarkers={({ L, Marker }) => {
                    const icon = L.divIcon({
                      className: "",
                      html: `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center"><div style="background-color:#18181b;color:white;padding:6px 10px;border-radius:8px;font-size:12px;font-weight:600;font-family:system-ui,-apple-system,sans-serif;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)">${venue?.name ?? "Event"}</div><div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #18181b;margin-top:-1px"></div></div>`,
                      iconAnchor: [50, 40],
                      iconSize: [100, 40],
                    });
                    return <Marker icon={icon} position={center} />;
                  }}
                  scrollWheelZoom={false}
                  zoom={15}
                />
              </Suspense>
            </div>
          )}

          <div className="mt-4">
            <p className="font-medium text-sm">How do you want to get there?</p>
            <div className="mt-2 space-y-2">
              {travelOptions.map(({ icon: Icon, label }) => (
                <button
                  className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-muted"
                  key={label}
                  type="button"
                >
                  <Icon className="size-5 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const EventDetailOrganizerAvatar = ({
  organizer,
}: {
  organizer: EventOrganizer;
}) => {
  if (organizer.image) {
    return (
      <BlockImage
        alt={organizer.name || "Organizer"}
        className="size-12 rounded-full object-cover"
        src={organizer.image}
      />
    );
  }
  if (!organizer.name) {
    return null;
  }
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-muted font-medium text-lg">
      {organizer.name.charAt(0)}
    </div>
  );
};

const EventDetailOrganizerStats = ({
  organizer,
}: {
  organizer: EventOrganizer;
}) => (
  <div className="flex gap-4 text-muted-foreground text-xs">
    {organizer.followers !== undefined && (
      <span>
        Followers
        <br />
        <strong>{formatNumber(organizer.followers)}</strong>
      </span>
    )}
    {organizer.eventsCount !== undefined && (
      <span>
        Events
        <br />
        <strong>{organizer.eventsCount}</strong>
      </span>
    )}
    {organizer.hostingYears !== undefined && (
      <span>
        Hosting
        <br />
        <strong>{organizer.hostingYears} yrs</strong>
      </span>
    )}
  </div>
);

const EventDetailOrganizerTrackRecord = ({
  organizer,
}: {
  organizer: EventOrganizer;
}) => {
  if (!(organizer.trackRecord || organizer.responseRate)) {
    return null;
  }
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-xs">
      {organizer.trackRecord === "great" && (
        <span
          className="flex items-center gap-1 text-green-600"
          data-apps-sdk-status="success"
        >
          <CheckCircle className="size-3" /> Great track record
        </span>
      )}
      {organizer.responseRate === "very responsive" && (
        <span
          className="flex items-center gap-1 text-orange-600"
          data-apps-sdk-status="warning"
        >
          <CheckCircle className="size-3" /> Very responsive
        </span>
      )}
    </div>
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
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">Organized by</h2>
          <div className="mt-3 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <EventDetailOrganizerAvatar organizer={organizer} />
              <div className="flex-1">
                {organizer.name && (
                  <p className="font-medium">{organizer.name}</p>
                )}
                <EventDetailOrganizerStats organizer={organizer} />
              </div>
            </div>
            <div className="mt-3 flex gap-2" data-apps-sdk-actions="">
              <Button
                className="flex-1"
                onClick={() => onContact?.(organizer)}
                size="sm"
                variant="outline"
              >
                Contact
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => onFollow?.(organizer)}
                size="sm"
              >
                Follow
              </Button>
            </div>
            <EventDetailOrganizerTrackRecord organizer={organizer} />
          </div>
        </>
      )}
    </section>
  );
};

export const EventDetailPolicies = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">Policies & Info</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.goodToKnow?.ageRestriction && (
              <span className="rounded-full border px-3 py-1 text-sm">
                {event.goodToKnow.ageRestriction}
              </span>
            )}
            {event.policies?.idRequired && (
              <span className="rounded-full border px-3 py-1 text-sm">
                ID checks
              </span>
            )}
            {event.policies?.securityOnSite && (
              <span className="rounded-full border px-3 py-1 text-sm">
                Security on site
              </span>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export const EventDetailFaq = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">FAQs</h2>
          <div className="mt-3 space-y-2">
            {event.faq?.map((item) => (
              <div className="text-sm" key={item.question}>
                <p>
                  <strong>{item.question.replace("?", "")}:</strong>{" "}
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export const EventDetailReport = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => (
  <button
    className={cn(
      "flex items-center gap-2 text-blue-600 text-sm hover:underline",
      className
    )}
    data-apps-sdk-status="info"
    type="button"
    {...props}
  >
    {children ?? (
      <>
        <Flag className="size-4" />
        Report this event
      </>
    )}
  </button>
);

export const EventDetailRelated = ({
  children,
  className,
  ...props
}: ComponentProps<"section">) => {
  const { event } = useEventDetail();
  return (
    <section className={className} {...props}>
      {children ?? (
        <>
          <h2 className="font-semibold text-lg">Related to this event</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.relatedTags?.map((tag) => (
              <span
                className="cursor-pointer rounded-full border px-3 py-1 text-sm hover:bg-muted"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
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
    <aside
      className={cn("mt-6 rounded-lg border bg-muted/30 p-4", className)}
      {...props}
    >
      {children ?? (
        <div className="flex items-center justify-between gap-4">
          <div>
            {event.priceRange && (
              <p className="font-semibold">{event.priceRange}</p>
            )}
            {event.startDateTime && (
              <p className="text-muted-foreground text-sm">
                {formatEventDateTime(event.startDateTime, event.endDateTime)}
              </p>
            )}
          </div>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => onGetTickets?.(event)}
          >
            Get tickets
          </Button>
        </div>
      )}
    </aside>
  );
};

export const EventDetailContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={cn("space-y-6 p-4", className)} {...props}>
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
    onShare: actions?.onShare,
    previousImage: () =>
      setCurrentImageIndex((index) =>
        index === 0 ? images.length - 1 : index - 1
      ),
    save: () => {
      setIsSaved((saved) => !saved);
      actions?.onSave?.(event);
    },
    showMap: appearance?.showMap ?? true,
  };

  return (
    <EventDetailContext.Provider value={context}>
      <article
        className={cn("mx-auto max-w-lg bg-background", className)}
        {...props}
      >
        {children}
      </article>
    </EventDetailContext.Provider>
  );
};

export const EventDetail = EventDetailRoot;
