"use client";

import { Check, Clock } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";

type ActionContext = Record<string, unknown>;

export type OrderStatusProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
>;

export const OrderStatus = createCompoundBlock<ActionContext, OrderStatusProps>(
  {
    buildContext: () => ({}),
    className: "w-full rounded-xl border bg-card p-4 sm:p-6",
    name: "OrderStatus",
    renderDefault: () => (
      <div className="space-y-4">
        <OrderStatus.TrackingNumber>
          <p className="text-sm text-muted-foreground">
            Sample trackingnumber content that can be fully replaced by
            children.
          </p>
        </OrderStatus.TrackingNumber>
        <OrderStatus.StatusBadge>
          <p className="text-sm text-muted-foreground">
            Sample statusbadge content that can be fully replaced by children.
          </p>
        </OrderStatus.StatusBadge>
        <OrderStatus.Timeline>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Received</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Processing</span>
            </div>
          </div>
        </OrderStatus.Timeline>
        <OrderStatus.EstimatedDelivery>
          <p className="text-sm text-muted-foreground">
            Sample estimateddelivery content that can be fully replaced by
            children.
          </p>
        </OrderStatus.EstimatedDelivery>
      </div>
    ),
    slots: {
      EstimatedDelivery: { className: "text-sm text-muted-foreground" },
      StatusBadge: {
        className:
          "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-medium",
      },
      Timeline: { className: "rounded-lg border p-3" },
      TrackingNumber: {
        className: "rounded-lg bg-muted/40 p-3 font-mono text-sm",
      },
    },
  }
);
