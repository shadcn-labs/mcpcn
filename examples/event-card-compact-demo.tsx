"use client";

import { EventCard, EventCardContent } from "@/registry/events/event-card";

export default function EventCardCompactDemo() {
  return (
    <EventCard appearance={{ variant: "compact" }}>
      <EventCardContent />
    </EventCard>
  );
}
