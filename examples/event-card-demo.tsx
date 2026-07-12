"use client";

import { EventCard } from "@/registry/events/event-card";

export default function EventCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventCard />
      <EventCard>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <EventCard.Content />
        </div>
      </EventCard>
    </div>
  );
}
