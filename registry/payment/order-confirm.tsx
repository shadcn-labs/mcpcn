"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";

import { createCompoundBlock, formatPrice } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  currency?: string;
  onConfirm?: () => void;
  formatPrice: (value: number) => string;
}

export interface OrderConfirmProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  currency?: string;
  onConfirm?: () => void;
}

export const OrderConfirm = createCompoundBlock<
  ActionContext,
  OrderConfirmProps
>({
  buildContext: (props) => ({
    currency: props.currency ?? "USD",
    formatPrice: (value: number) => formatPrice(value, props.currency ?? "USD"),
    onConfirm: props.onConfirm,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "OrderConfirm",
  renderDefault: () => (
    <div className="space-y-4">
      <OrderConfirm.Header>
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5" />
          <div>
            <p className="font-semibold">Orderconfirm</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </OrderConfirm.Header>
      <OrderConfirm.ItemRow>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample Item</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </OrderConfirm.ItemRow>
      <OrderConfirm.PriceBreakdown>
        <p className="text-sm text-muted-foreground">
          Sample pricebreakdown content that can be fully replaced by children.
        </p>
      </OrderConfirm.PriceBreakdown>
      <OrderConfirm.Total>
        <p className="text-sm text-muted-foreground">
          Sample total content that can be fully replaced by children.
        </p>
      </OrderConfirm.Total>
      <OrderConfirm.Action />
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
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    ItemRow: { className: "rounded-lg border p-3" },
    PriceBreakdown: {
      className: "space-y-2 rounded-lg bg-muted/30 p-3 text-sm",
    },
    Total: {
      className:
        "flex items-center justify-between border-t pt-3 font-semibold",
    },
  },
});
