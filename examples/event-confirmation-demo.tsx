"use client";

import { EventConfirmation } from "@/registry/events/event-confirmation";

export default function EventConfirmationDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventConfirmation />
      <EventConfirmation>
        <EventConfirmation.Header
          orderNumber="#EVENT-2048"
          heading="You’re on the list"
        />
        <EventConfirmation.Details
          eventTitle="MCP Apps Summit"
          ticketCount={1}
          recipientEmail="builder@example.com"
          eventDate="July 24 · 10 AM"
          eventLocation="Bengaluru"
        />
        <EventConfirmation.Organizer name="mcpcn community">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
            Verified
          </span>
        </EventConfirmation.Organizer>
        <EventConfirmation.Share />
      </EventConfirmation>
    </div>
  );
}
