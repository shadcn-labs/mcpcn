"use client";

import { TicketTierSelect } from "@/registry/events/ticket-tier-select";

export default function TicketTierSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TicketTierSelect />
      <TicketTierSelect>
        <TicketTierSelect.Header>
          <div>
            <p className="font-semibold">Custom Ticket Tier Select</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </TicketTierSelect.Header>
        <TicketTierSelect.PriceDisplay>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </TicketTierSelect.PriceDisplay>
      </TicketTierSelect>
    </div>
  );
}
