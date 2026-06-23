"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  selectedSeats?: string[];
  onSelectSeat?: (seat: string) => void;
}

export interface SeatSelectorProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  selectedSeats?: string[];
  onSelectSeat?: (seat: string) => void;
}

export const SeatSelector = createCompoundBlock<
  ActionContext,
  SeatSelectorProps
>({
  buildContext: (props) => ({
    onSelectSeat: props.onSelectSeat,
    selectedSeats: props.selectedSeats ?? [],
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "SeatSelector",
  renderDefault: () => (
    <div className="space-y-4">
      <SeatSelector.Seat>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample Seat</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </SeatSelector.Seat>
      <SeatSelector.Legend>
        <p className="text-sm text-muted-foreground">
          Sample legend content that can be fully replaced by children.
        </p>
      </SeatSelector.Legend>
      <SeatSelector.Summary>
        <p className="text-sm text-muted-foreground">
          Sample summary content that can be fully replaced by children.
        </p>
      </SeatSelector.Summary>
    </div>
  ),
  slots: {
    Legend: { className: "flex flex-wrap gap-3 text-xs text-muted-foreground" },
    Seat: {
      className:
        "flex h-9 w-9 items-center justify-center rounded-md border text-xs",
    },
    Summary: { className: "rounded-lg border bg-muted/30 p-4" },
  },
});
