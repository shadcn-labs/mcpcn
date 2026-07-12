"use client";

import { EventList } from "@/registry/events/event-list";

export default function EventListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventList />
      <EventList>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <EventList.Content />
        </div>
      </EventList>
    </div>
  );
}
