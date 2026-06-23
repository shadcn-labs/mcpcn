"use client";

import { EventConfirmation } from "@/registry/events/event-confirmation";

export default function EventConfirmationDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventConfirmation />
      <EventConfirmation>
        <EventConfirmation.Header>
          <div>
            <p className="font-semibold">Custom Event Confirmation</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </EventConfirmation.Header>
        <EventConfirmation.Details>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </EventConfirmation.Details>
      </EventConfirmation>
    </div>
  );
}
