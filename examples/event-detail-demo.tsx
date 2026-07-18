"use client";

import {
  EventDetail,
  EventDetailActions,
  EventDetailAiMatch,
  EventDetailContent,
  EventDetailDescription,
  EventDetailFaq,
  EventDetailGallery,
  EventDetailGoodToKnow,
  EventDetailHeader,
  EventDetailLineup,
  EventDetailMap,
  EventDetailOrganizer,
  EventDetailPolicies,
  EventDetailRelated,
  EventDetailReport,
  EventDetailTickets,
} from "@/registry/events/event-detail";

export default function EventDetailDemo() {
  return (
    <EventDetail>
      <EventDetailGallery />
      <EventDetailContent>
        <EventDetailHeader />
        <EventDetailActions />
        <EventDetailAiMatch />
        <EventDetailDescription />
        <EventDetailLineup />
        <EventDetailGoodToKnow />
        <EventDetailMap />
        <EventDetailOrganizer />
        <EventDetailPolicies />
        <EventDetailFaq />
        <EventDetailReport />
        <EventDetailRelated />
        <EventDetailTickets />
      </EventDetailContent>
    </EventDetail>
  );
}
