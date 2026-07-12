"use client";

import { TicketTierSelect } from "@/registry/events/ticket-tier-select";

export default function TicketTierSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TicketTierSelect />
      <TicketTierSelect selectedTier="balcony">
        <TicketTierSelect.TicketOption
          value="balcony"
          label="Balcony"
          description="Unobstructed elevated view"
          price={59}
        >
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
            Best view
          </span>
        </TicketTierSelect.TicketOption>
        <TicketTierSelect.Summary>
          Balcony ticket · <TicketTierSelect.PriceDisplay value={59} />
        </TicketTierSelect.Summary>
        <TicketTierSelect.Action>Reserve balcony</TicketTierSelect.Action>
      </TicketTierSelect>
    </div>
  );
}
