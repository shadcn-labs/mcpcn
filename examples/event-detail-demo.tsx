"use client";

import {
  EventDetail,
  EventDetailContent,
  EventDetailDescription,
  EventDetailHeader,
  EventDetailMap,
  EventDetailOrganizer,
  EventDetailTickets,
} from "@/registry/events/event-detail";

export default function EventDetailDemo() {
  return (
    <EventDetail>
      <EventDetailContent>
        <EventDetailHeader />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <EventDetailDescription />
            <EventDetailOrganizer />
            <EventDetailMap />
          </div>
          <EventDetailTickets className="h-fit" />
        </div>
      </EventDetailContent>
    </EventDetail>
  );
}
