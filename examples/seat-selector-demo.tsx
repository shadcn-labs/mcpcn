"use client";

import { SeatSelector } from "@/registry/events/seat-selector";

export default function SeatSelectorDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SeatSelector />
      <SeatSelector selectedSeats={["B2", "B3"]}>
        <div className="flex gap-2">
          <SeatSelector.Seat seat="B1" />
          <SeatSelector.Seat seat="B2">
            <span className="font-bold">B2</span>
          </SeatSelector.Seat>
          <SeatSelector.Seat seat="B3" />
          <SeatSelector.Seat seat="B4" disabled />
        </div>
        <SeatSelector.Legend>
          <span>Outlined: available</span>
          <span>Filled: your group</span>
        </SeatSelector.Legend>
        <SeatSelector.Summary />
      </SeatSelector>
    </div>
  );
}
