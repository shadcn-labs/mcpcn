"use client";

import { EventCard, EventCardContent } from "@/registry/events/event-card";

export default function EventCardHorizontalDemo() {
  return (
    <EventCard appearance={{ variant: "horizontal" }}>
      <EventCardContent />
    </EventCard>
  );
}
