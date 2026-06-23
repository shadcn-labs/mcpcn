"use client";

import { SeatSelector } from "@/registry/events/seat-selector";

export default function SeatSelectorDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SeatSelector />
      <SeatSelector>
        <SeatSelector.Header>
          <div>
            <p className="font-semibold">Custom Seat Selector</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </SeatSelector.Header>
        <SeatSelector.Legend>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </SeatSelector.Legend>
      </SeatSelector>
    </div>
  );
}
