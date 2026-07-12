"use client";

import { EventConfirmation } from "@/registry/events/event-confirmation";

export default function EventConfirmationDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EventConfirmation />
      <EventConfirmation>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <EventConfirmation.Content />
        </div>
      </EventConfirmation>
    </div>
  );
}
