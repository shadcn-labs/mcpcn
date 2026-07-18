"use client";

import {
  EventConfirmation,
  EventConfirmationContent,
} from "@/registry/events/event-confirmation";

export default function EventConfirmationDemo() {
  return (
    <EventConfirmation>
      <EventConfirmationContent />
    </EventConfirmation>
  );
}
