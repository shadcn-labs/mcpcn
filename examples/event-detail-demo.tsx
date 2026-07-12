"use client";

import { EventDetail } from "@/registry/events/event-detail";

export default function EventDetailDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventDetail />
      <EventDetail>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <EventDetail.Content />
        </div>
      </EventDetail>
    </div>
  );
}
