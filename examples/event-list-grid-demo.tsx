"use client";

import { EventList, EventListContent } from "@/registry/events/event-list";

export default function EventListGridDemo() {
  return (
    <EventList appearance={{ variant: "grid" }}>
      <EventListContent />
    </EventList>
  );
}
