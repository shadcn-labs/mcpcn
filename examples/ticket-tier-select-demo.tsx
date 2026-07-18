"use client";

import {
  TicketOrderSummary,
  TicketTierCheckout,
  TicketTierContent,
  TicketTierHeader,
  TicketTierOptions,
  TicketTierSelect,
} from "@/registry/events/ticket-tier-select";

export default function TicketTierSelectDemo() {
  return (
    <TicketTierSelect>
      <TicketTierContent>
        <div className="flex-1">
          <TicketTierHeader />
          <TicketTierOptions />
          <div className="mt-6">
            <TicketTierCheckout />
          </div>
        </div>
        <TicketOrderSummary />
      </TicketTierContent>
    </TicketTierSelect>
  );
}
