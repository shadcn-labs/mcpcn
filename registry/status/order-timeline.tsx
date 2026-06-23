"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";

type ActionContext = Record<string, unknown>;

export type OrderTimelineProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
>;

export const OrderTimeline = createCompoundBlock<
  ActionContext,
  OrderTimelineProps
>({
  buildContext: () => ({}),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "OrderTimeline",
  renderDefault: () => (
    <div className="space-y-4">
      <OrderTimeline.Step>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample Step</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </OrderTimeline.Step>
      <OrderTimeline.Label>
        <p className="text-sm text-muted-foreground">
          Sample label content that can be fully replaced by children.
        </p>
      </OrderTimeline.Label>
      <OrderTimeline.Connector>
        <p className="text-sm text-muted-foreground">
          Sample connector content that can be fully replaced by children.
        </p>
      </OrderTimeline.Connector>
    </div>
  ),
  slots: {
    Connector: { className: "h-px flex-1 bg-border" },
    Label: { className: "text-sm" },
    Step: { className: "flex items-center gap-2" },
  },
});
