"use client";

import { TicketTierSelect } from "@/registry/events/ticket-tier-select";

export default function TicketTierSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TicketTierSelect />
      <TicketTierSelect>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <TicketTierSelect.Content />
        </div>
      </TicketTierSelect>
    </div>
  );
}
