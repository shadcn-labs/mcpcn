"use client";

import { EventList, EventListContent } from "@/registry/events/event-list";

export default function EventListCarouselDemo() {
  return (
    <EventList appearance={{ variant: "carousel" }}>
      <EventListContent />
    </EventList>
  );
}
