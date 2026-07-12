"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext, formatPrice } from "../_lib/compound";

interface TicketTierContextValue {
  currency: string;
  formatPrice: (value: number) => string;
  onCheckout?: () => void;
  onSelectTier?: (tier: string) => void;
  selectedTier?: string;
}

const { Provider, useCompoundContext } =
  createCompoundContext<TicketTierContextValue>("TicketTierSelect");

export interface TicketTierSelectProps extends ComponentPropsWithoutRef<"div"> {
  currency?: string;
  onCheckout?: () => void;
  onSelectTier?: (tier: string) => void;
  selectedTier?: string;
}

interface TicketOptionProps extends ComponentPropsWithoutRef<"label"> {
  description?: string;
  label?: string;
  price?: number;
  soldOut?: boolean;
  value?: string;
}

function TicketOption({
  description,
  label = "General admission",
  price = 0,
  soldOut,
  value = "general",
  className,
  children,
  ...props
}: TicketOptionProps) {
  const context = useCompoundContext();
  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 transition-colors has-[:checked]:border-foreground",
        soldOut && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <input
        type="radio"
        name="ticket-tier"
        value={value}
        checked={context.selectedTier === value}
        disabled={soldOut}
        onChange={() => context.onSelectTier?.(value)}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-medium">
          {label}
          {children}
        </span>
        {description ? (
          <span className="block text-sm text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      <span className="font-semibold">
        {soldOut ? "Sold out" : context.formatPrice(price)}
      </span>
    </label>
  );
}

interface PriceDisplayProps extends ComponentPropsWithoutRef<"span"> {
  value?: number;
}

function PriceDisplay({
  value = 0,
  className,
  children,
  ...props
}: PriceDisplayProps) {
  const context = useCompoundContext();
  return (
    <span className={cn("font-semibold", className)} {...props}>
      {children ?? context.formatPrice(value)}
    </span>
  );
}

function Summary({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { selectedTier } = useCompoundContext();
  return (
    <div
      className={cn("rounded-lg border bg-muted/30 p-4", className)}
      {...props}
    >
      {children ?? (
        <p className="text-sm">
          <span className="font-medium">Selected tier:</span>{" "}
          {selectedTier ?? "Choose a ticket"}
        </p>
      )}
    </div>
  );
}

function Action({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { onCheckout, selectedTier } = useCompoundContext();
  return (
    <Button
      className={className}
      onClick={onCheckout}
      disabled={!selectedTier}
      {...props}
    >
      {children ?? "Continue to checkout"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

function TicketTierSelectRoot({
  currency = "USD",
  onCheckout,
  onSelectTier,
  selectedTier,
  className,
  children,
  ...props
}: TicketTierSelectProps) {
  return (
    <Provider
      value={{
        currency,
        formatPrice: (value) => formatPrice(value, currency),
        onCheckout,
        onSelectTier,
        selectedTier,
      }}
    >
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <TicketOption
              value="vip"
              label="VIP"
              description="Front-row access and lounge entry"
              price={149}
            />
            <TicketOption
              value="standard"
              label="Standard"
              description="Reserved seating"
              price={79}
            >
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                Early bird
              </span>
            </TicketOption>
            <TicketOption value="general" label="General" price={39} soldOut />
            <Summary />
            <Action />
          </>
        )}
      </div>
    </Provider>
  );
}

export const TicketTierSelect = Object.assign(TicketTierSelectRoot, {
  Action,
  PriceDisplay,
  Summary,
  TicketOption,
});
