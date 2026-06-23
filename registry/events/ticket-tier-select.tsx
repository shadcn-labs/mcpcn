"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";

import { createCompoundBlock, formatPrice } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  currency?: string;
  onCheckout?: () => void;
  formatPrice: (value: number) => string;
}

export interface TicketTierSelectProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  currency?: string;
  onCheckout?: () => void;
}

export const TicketTierSelect = createCompoundBlock<
  ActionContext,
  TicketTierSelectProps
>({
  buildContext: (props) => ({
    currency: props.currency ?? "USD",
    formatPrice: (value: number) => formatPrice(value, props.currency ?? "USD"),
    onCheckout: props.onCheckout,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "TicketTierSelect",
  renderDefault: () => (
    <div className="space-y-4">
      <TicketTierSelect.TicketOption>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample Ticketoption</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </TicketTierSelect.TicketOption>
      <TicketTierSelect.PriceDisplay>
        <p className="text-sm text-muted-foreground">
          Sample pricedisplay content that can be fully replaced by children.
        </p>
      </TicketTierSelect.PriceDisplay>
      <TicketTierSelect.Summary>
        <p className="text-sm text-muted-foreground">
          Sample summary content that can be fully replaced by children.
        </p>
      </TicketTierSelect.Summary>
      <TicketTierSelect.Action />
    </div>
  ),
  slots: {
    Action: {
      render: ({ className, children }, context) => (
        <Button
          className={className}
          onClick={(context as { onConfirm?: () => void }).onConfirm}
        >
          {children ?? "Confirm order"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    PriceDisplay: { className: "font-semibold" },
    Summary: { className: "rounded-lg border bg-muted/30 p-4" },
    TicketOption: { className: "rounded-lg border p-4" },
  },
});
