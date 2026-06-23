"use client";

import { EventConfirmation } from "@/registry/events/event-confirmation";
import { TicketTierSelect } from "@/registry/events/ticket-tier-select";

export default function EventsIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <EventConfirmation onShare={() => console.info("mcpcn action")} />
      <TicketTierSelect onCheckout={() => console.info("mcpcn action")} />
    </div>
  );
}
