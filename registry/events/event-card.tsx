"use client";

import {
  CalendarX,
  CirclePause,
  Clock,
  Flame,
  MapPin,
  Sparkles,
  Star,
  Ticket,
  Timer,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ElementType, ImgHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { Event, EventSignal } from "./types";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface EventCardContextValue {
  event: Event;
  onClick?: (event: Event) => void;
  showRating: boolean;
  showSignal: boolean;
  showTags: boolean;
  variant: "compact" | "covered" | "default" | "horizontal";
}

const EventCardContext = createContext<EventCardContextValue | null>(null);

export const useEventCard = () => {
  const context = useContext(EventCardContext);
  if (!context) {
    throw new Error("EventCard components must be used within EventCard");
  }
  return context;
};

const DEFAULT_EVENT: Event = {
  ageRestriction: "21+",
  category: "Music",
  city: "Los Angeles",
  dateTime: "Tonight 9:00 PM - 3:00 AM",
  eventSignal: "going-fast",
  image: "https://picsum.photos/seed/event-card/800/450",
  neighborhood: "Echo Park",
  organizerRating: 4.8,
  priceRange: "$45 - $150",
  reviewCount: 12_453,
  title: "NEON Vol. 9",
  venue: "Echoplex",
  vibeTags: ["High energy", "Late night", "Dressy"],
};

const SIGNALS: Record<
  EventSignal,
  { className: string; icon: ElementType; label: string }
> = {
  canceled: {
    className: "border-gray-200 bg-gray-500/10 text-gray-600",
    icon: XCircle,
    label: "Canceled",
  },
  ended: {
    className: "border-gray-200 bg-gray-500/10 text-gray-600",
    icon: CalendarX,
    label: "Ended",
  },
  "few-tickets-left": {
    className: "border-orange-200 bg-orange-500/10 text-orange-600",
    icon: Ticket,
    label: "Few Tickets Left",
  },
  "going-fast": {
    className: "border-orange-200 bg-orange-500/10 text-orange-600",
    icon: Flame,
    label: "Going Fast",
  },
  "just-added": {
    className: "border-blue-200 bg-blue-500/10 text-blue-600",
    icon: Sparkles,
    label: "Just Added",
  },
  popular: {
    className: "border-pink-200 bg-pink-500/10 text-pink-600",
    icon: TrendingUp,
    label: "Popular",
  },
  postponed: {
    className: "border-yellow-200 bg-yellow-500/10 text-yellow-600",
    icon: CirclePause,
    label: "Postponed",
  },
  "sales-end-soon": {
    className: "border-red-200 bg-red-500/10 text-red-600",
    icon: Timer,
    label: "Sales End Soon",
  },
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

export interface EventCardProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  actions?: {
    onClick?: (event: Event) => void;
  };
  appearance?: {
    showRating?: boolean;
    showSignal?: boolean;
    showTags?: boolean;
    variant?: "default" | "compact" | "horizontal" | "covered";
  };
  data?: {
    event?: Event;
  };
}

export const EventCardImage = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event } = useEventCard();
  return (
    <div className={cn("overflow-hidden bg-muted", className)} {...props}>
      {event.image ? (
        <BlockImage
          alt={event.title ?? "Event"}
          className="size-full object-cover"
          src={event.image}
        />
      ) : (
        <div className="size-full bg-muted" />
      )}
    </div>
  );
};

export const EventCardSignal = ({
  className,
  ...props
}: ComponentProps<"span">) => {
  const { event, showSignal } = useEventCard();
  if (!(showSignal && event.eventSignal)) {
    return null;
  }
  const signal = SIGNALS[event.eventSignal];
  const Icon = signal.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium text-xs",
        signal.className,
        className
      )}
      {...props}
    >
      <Icon className="size-3" />
      {signal.label}
    </span>
  );
};

export const EventCardTags = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event, showTags } = useEventCard();
  const tags = event.vibeTags?.slice(0, 3) ?? [];
  if (!(showTags && (children || tags.length > 0))) {
    return null;
  }
  return (
    <div className={cn("flex flex-wrap gap-1", className)} {...props}>
      {children ??
        tags.map((tag) => (
          <span
            className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
            key={tag}
          >
            {tag}
          </span>
        ))}
    </div>
  );
};

export const EventCardMeta = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event } = useEventCard();
  const location = [event.venue, event.neighborhood]
    .filter(Boolean)
    .join(" · ");
  return (
    <div
      className={cn("space-y-1 text-muted-foreground text-sm", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0" />
            <span>{event.dateTime}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const EventCardFooter = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { event, showRating } = useEventCard();
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children ?? (
        <>
          {event.priceRange && (
            <span className="font-medium">{event.priceRange}</span>
          )}
          {showRating && event.organizerRating && (
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <Star className="size-3.5 fill-current text-yellow-500" />
              {event.organizerRating}
              {event.reviewCount && (
                <span className="text-xs">
                  ({formatNumber(event.reviewCount)})
                </span>
              )}
            </span>
          )}
        </>
      )}
    </div>
  );
};

const EventCardText = () => {
  const { event } = useEventCard();
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div>
          {event.category && (
            <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-wide">
              {event.category}
            </p>
          )}
          {event.title && (
            <h3 className="line-clamp-2 font-semibold leading-tight">
              {event.title}
            </h3>
          )}
        </div>
        <EventCardSignal />
      </div>
      <EventCardMeta className="mt-2" />
      <EventCardTags className="mt-2" />
    </>
  );
};

const CoveredEventCard = () => {
  const { event } = useEventCard();
  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-lg border text-left text-white">
      <EventCardImage className="absolute inset-0 size-full" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <EventCardSignal />
        <div>
          {event.title && (
            <h3 className="font-semibold text-lg">{event.title}</h3>
          )}
          <EventCardMeta className="mt-2 text-white/80" />
          <EventCardFooter className="mt-3" />
        </div>
      </div>
    </div>
  );
};

const HorizontalEventCard = () => (
  <div className="flex flex-col gap-4 rounded-lg border bg-card p-3 text-left sm:flex-row">
    <EventCardImage className="aspect-video shrink-0 rounded-md sm:h-28 sm:w-36" />
    <div className="min-w-0 flex-1">
      <EventCardText />
      <EventCardFooter className="mt-3" />
    </div>
  </div>
);

const CompactEventCard = () => (
  <div className="rounded-lg border bg-card p-3 text-left">
    <EventCardText />
    <EventCardFooter className="mt-3" />
  </div>
);

const DefaultEventCard = () => (
  <div className="overflow-hidden rounded-lg border bg-card text-left">
    <EventCardImage className="aspect-video w-full" />
    <div className="p-4">
      <EventCardText />
      <EventCardFooter className="mt-4" />
    </div>
  </div>
);

export const EventCardContent = () => {
  const { variant } = useEventCard();
  if (variant === "covered") {
    return <CoveredEventCard />;
  }
  if (variant === "horizontal") {
    return <HorizontalEventCard />;
  }
  if (variant === "compact") {
    return <CompactEventCard />;
  }
  return <DefaultEventCard />;
};

const EventCardRoot = ({
  actions,
  appearance,
  children,
  className,
  data,
  ...props
}: EventCardProps) => {
  const event = data?.event ?? DEFAULT_EVENT;
  const context: EventCardContextValue = {
    event,
    onClick: actions?.onClick,
    showRating: appearance?.showRating ?? true,
    showSignal: appearance?.showSignal ?? true,
    showTags: appearance?.showTags ?? true,
    variant: appearance?.variant ?? "default",
  };
  return (
    <EventCardContext.Provider value={context}>
      <button
        className={cn("w-full cursor-pointer", className)}
        onClick={() => actions?.onClick?.(event)}
        type="button"
        {...props}
      >
        {children ?? <EventCardContent />}
      </button>
    </EventCardContext.Provider>
  );
};

export const EventCard = EventCardRoot;
