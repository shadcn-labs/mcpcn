"use client";

import { CheckCircle, Mail, MessageCircle } from "lucide-react";
import type { SVGProps } from "react";

import { Button } from "@/components/ui/button";
import {
  createCompoundComponent,
  RegistryImage,
} from "@/components/ui/compound";

import { demoEventConfirmation } from "./demo/events";

const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.5 22v-9h3l.5-3h-3.5V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7v3h3v9h3.5Z" />
  </svg>
);

const Twitter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.2-8.3L2.9 2h6.3l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
  </svg>
);

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EventConfirmationProps
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Props for the EventConfirmation component. Displays booking success message,
 * ticket delivery info, organizer follow card, and social sharing options.
 */
export interface EventConfirmationProps {
  data?: {
    /** Order/confirmation number. */
    orderNumber?: string;
    /** Event title. */
    eventTitle?: string;
    /** Number of tickets purchased. */
    ticketCount?: number;
    /** Email address where tickets were sent. */
    recipientEmail?: string;
    /** Event date and time string. */
    eventDate?: string;
    /** Event location. */
    eventLocation?: string;
    /** Event organizer information. */
    organizer?: {
      name: string;
      image?: string;
    };
  };
  actions?: {
    /** Called when "Take me to my tickets" button is clicked. */
    onViewTickets?: () => void;
    /** Called when "Follow" organizer button is clicked. */
    onFollowOrganizer?: () => void;
    /** Called when a social share button is clicked. */
    onShare?: (
      platform: "facebook" | "twitter" | "messenger" | "email"
    ) => void;
  };
}

const EventConfirmationView = ({ data, actions }: EventConfirmationProps) => {
  const resolved: NonNullable<EventConfirmationProps["data"]> =
    data ?? demoEventConfirmation;
  const orderNumber = resolved?.orderNumber;
  const eventTitle = resolved?.eventTitle;
  const ticketCount = resolved?.ticketCount;
  const recipientEmail = resolved?.recipientEmail;
  const eventDate = resolved?.eventDate;
  const eventLocation = resolved?.eventLocation;
  const organizer = resolved?.organizer;
  const { onViewTickets, onFollowOrganizer, onShare } = actions ?? {};

  return (
    <div className="rounded-xl border bg-card p-6 ">
      {/* Success header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Thanks for your order!</h1>
            {orderNumber && (
              <p className="text-sm text-muted-foreground">{orderNumber}</p>
            )}
          </div>
        </div>
        <Button onClick={onViewTickets} size="lg">
          Take me to my tickets
        </Button>
      </div>

      {/* Event details */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
          You're going to
        </p>
        {eventTitle && (
          <h2 className="text-2xl font-bold leading-tight mb-6">
            {eventTitle}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Ticket sent to */}
          {recipientEmail && (
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                {ticketCount ?? 1} Ticket sent to
              </p>
              <p className="text-sm">{recipientEmail}</p>
            </div>
          )}

          {/* Date */}
          {eventDate && (
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                Date
              </p>
              <p className="text-sm">{eventDate}</p>
            </div>
          )}

          {/* Location */}
          {eventLocation && (
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                Location
              </p>
              <p className="text-sm">{eventLocation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Organizer follow section */}
      {organizer && (
        <div className="rounded-lg border bg-muted/30 p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {organizer.image ? (
                <RegistryImage
                  src={organizer.image}
                  alt={organizer.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <span className="text-lg font-semibold text-orange-600">
                    {organizer.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">
                  Don't miss out on events from
                </p>
                <p className="font-semibold">{organizer.name}</p>
                <p className="text-xs text-muted-foreground">
                  Created this event
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onFollowOrganizer}>
              Follow
            </Button>
          </div>
        </div>
      )}

      {/* Social sharing */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onShare?.("facebook")}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </button>
        <button
          onClick={() => onShare?.("messenger")}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
          aria-label="Share on Messenger"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
        <button
          onClick={() => onShare?.("twitter")}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </button>
        <button
          onClick={() => onShare?.("email")}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors"
          aria-label="Share via Email"
        >
          <Mail className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export const EventConfirmation = createCompoundComponent(
  EventConfirmationView,
  "EventConfirmation"
);
