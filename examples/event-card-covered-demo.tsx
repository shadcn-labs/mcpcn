"use client";

import { EventCard, EventCardContent } from "@/registry/events/event-card";

export default function EventCardCoveredDemo() {
  return (
    <EventCard appearance={{ variant: "covered" }}>
      <EventCardContent />
    </EventCard>
  );
}
