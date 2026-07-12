"use client";

import { CheckCircle, AtSign, Mail, MessageCircle, Share2 } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";
import type { SharePlatform } from "./types";

interface EventConfirmationContextValue {
  onViewTickets?: () => void;
  onFollowOrganizer?: () => void;
  onShare?: (platform: SharePlatform) => void;
}

const { Provider, useCompoundContext } =
  createCompoundContext<EventConfirmationContextValue>("EventConfirmation");

export interface EventConfirmationProps extends ComponentPropsWithoutRef<"div"> {
  onViewTickets?: () => void;
  onFollowOrganizer?: () => void;
  onShare?: (platform: SharePlatform) => void;
}

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {
  orderNumber?: string;
  heading?: string;
}

function Header({
  orderNumber,
  heading = "Thanks for your order!",
  className,
  children,
  ...props
}: HeaderProps) {
  const { onViewTickets } = useCompoundContext();

  return (
    <div
      className={cn(
        "mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{heading}</h2>
          {orderNumber ? (
            <p className="text-sm text-muted-foreground">{orderNumber}</p>
          ) : null}
          {children}
        </div>
      </div>
      <Button onClick={onViewTickets} size="lg">
        Take me to my tickets
      </Button>
    </div>
  );
}

interface DetailsProps extends ComponentPropsWithoutRef<"div"> {
  eventTitle?: string;
  ticketCount?: number;
  recipientEmail?: string;
  eventDate?: string;
  eventLocation?: string;
}

function Details({
  eventTitle,
  ticketCount = 1,
  recipientEmail,
  eventDate,
  eventLocation,
  className,
  children,
  ...props
}: DetailsProps) {
  useCompoundContext();

  return (
    <div className={cn("mb-8", className)} {...props}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        You&apos;re going to
      </p>
      {eventTitle ? (
        <h3 className="mb-6 text-2xl font-bold leading-tight">{eventTitle}</h3>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {recipientEmail ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} sent to
            </p>
            <p className="text-sm">{recipientEmail}</p>
          </div>
        ) : null}
        {eventDate ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Date
            </p>
            <p className="text-sm">{eventDate}</p>
          </div>
        ) : null}
        {eventLocation ? (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Location
            </p>
            <p className="text-sm">{eventLocation}</p>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

interface OrganizerProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  image?: string;
}

function Organizer({
  name,
  image,
  className,
  children,
  ...props
}: OrganizerProps) {
  const { onFollowOrganizer } = useCompoundContext();

  return (
    <div
      className={cn("mb-8 rounded-lg border bg-muted/30 p-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950">
              <span className="text-lg font-semibold text-orange-600">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              Don&apos;t miss out on events from
            </p>
            <div className="flex items-center gap-1.5">
              <p className="truncate font-semibold">{name}</p>
              {children}
            </div>
            <p className="text-xs text-muted-foreground">Created this event</p>
          </div>
        </div>
        <Button variant="outline" onClick={onFollowOrganizer}>
          Follow
        </Button>
      </div>
    </div>
  );
}

const shareOptions: {
  label: string;
  platform: SharePlatform;
  icon: ReactNode;
}[] = [
  { icon: <Share2 />, label: "Share on Facebook", platform: "facebook" },
  {
    icon: <MessageCircle />,
    label: "Share on Messenger",
    platform: "messenger",
  },
  { icon: <AtSign />, label: "Share on Twitter", platform: "twitter" },
  { icon: <Mail />, label: "Share via email", platform: "email" },
];

function Share({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { onShare } = useCompoundContext();

  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children ??
        shareOptions.map(({ label, platform, icon }) => (
          <button
            key={platform}
            type="button"
            onClick={() => onShare?.(platform)}
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-muted [&_svg]:h-5 [&_svg]:w-5"
            aria-label={label}
          >
            {icon}
          </button>
        ))}
    </div>
  );
}

function EventConfirmationRoot({
  onViewTickets,
  onFollowOrganizer,
  onShare,
  className,
  children,
  ...props
}: EventConfirmationProps) {
  return (
    <Provider value={{ onFollowOrganizer, onShare, onViewTickets }}>
      <div
        className={cn("rounded-xl border bg-card p-6", className)}
        {...props}
      >
        {children ?? (
          <>
            <Header orderNumber="#14040333743" />
            <Details
              eventTitle="A night under the stars"
              ticketCount={2}
              recipientEmail="hello@example.com"
              eventDate="Friday, Feb 6 · 8pm"
              eventLocation="Los Angeles, CA"
            />
            <Organizer name="Manifest Events" />
            <Share />
          </>
        )}
      </div>
    </Provider>
  );
}

export const EventConfirmation = Object.assign(EventConfirmationRoot, {
  Details,
  Header,
  Organizer,
  Share,
});
