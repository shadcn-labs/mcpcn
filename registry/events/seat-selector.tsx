"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface SeatSelectorContextValue {
  onSelectSeat?: (seat: string) => void;
  selectedSeats: string[];
}

const { Provider, useCompoundContext } =
  createCompoundContext<SeatSelectorContextValue>("SeatSelector");

export interface SeatSelectorProps extends ComponentPropsWithoutRef<"div"> {
  onSelectSeat?: (seat: string) => void;
  selectedSeats?: string[];
}

interface SeatProps extends ComponentPropsWithoutRef<"button"> {
  disabled?: boolean;
  seat?: string;
}

function Seat({
  seat = "A1",
  disabled,
  className,
  children,
  ...props
}: SeatProps) {
  const { onSelectSeat, selectedSeats } = useCompoundContext();
  const selected = selectedSeats.includes(seat);
  return (
    <button
      type="button"
      aria-label={`Seat ${seat}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelectSeat?.(seat)}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border text-xs transition-colors",
        selected && "border-foreground bg-foreground text-background",
        disabled &&
          "cursor-not-allowed bg-muted text-muted-foreground opacity-50",
        className
      )}
      {...props}
    >
      {children ?? seat}
    </button>
  );
}

function Legend({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  useCompoundContext();
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span>□ Available</span>
          <span>■ Selected</span>
          <span className="opacity-50">■ Unavailable</span>
        </>
      )}
    </div>
  );
}

function Summary({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { selectedSeats } = useCompoundContext();
  return (
    <div
      className={cn("rounded-lg border bg-muted/30 p-4", className)}
      {...props}
    >
      {children ?? (
        <p className="text-sm">
          <span className="font-medium">Selected seats:</span>{" "}
          {selectedSeats.length ? selectedSeats.join(", ") : "None"}
        </p>
      )}
    </div>
  );
}

function SeatSelectorRoot({
  selectedSeats = [],
  onSelectSeat,
  className,
  children,
  ...props
}: SeatSelectorProps) {
  return (
    <Provider value={{ onSelectSeat, selectedSeats }}>
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div className="mx-auto mb-6 w-3/4 rounded-b-full border-t-4 py-2 text-center text-xs text-muted-foreground">
              STAGE
            </div>
            <div className="grid grid-cols-5 justify-center gap-2">
              {["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"].map(
                (seat) => (
                  <Seat key={seat} seat={seat} disabled={seat === "A3"} />
                )
              )}
            </div>
            <Legend />
            <Summary />
          </>
        )}
      </div>
    </Provider>
  );
}

export const SeatSelector = Object.assign(SeatSelectorRoot, {
  Legend,
  Seat,
  Summary,
});
