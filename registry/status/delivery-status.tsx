"use client";

import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";

type ActionContext = Record<string, unknown>;

export type DeliveryStatusProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
>;

export const DeliveryStatus = createCompoundBlock<
  ActionContext,
  DeliveryStatusProps
>({
  buildContext: () => ({}),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "DeliveryStatus",
  renderDefault: () => (
    <div className="space-y-4">
      <DeliveryStatus.StatusBadge>
        <p className="text-sm text-muted-foreground">
          Sample statusbadge content that can be fully replaced by children.
        </p>
      </DeliveryStatus.StatusBadge>
      <DeliveryStatus.EstimatedTime>
        <p className="text-sm text-muted-foreground">
          Sample estimatedtime content that can be fully replaced by children.
        </p>
      </DeliveryStatus.EstimatedTime>
      <DeliveryStatus.TrackingLink>
        <p className="text-sm text-muted-foreground">
          Sample trackinglink content that can be fully replaced by children.
        </p>
      </DeliveryStatus.TrackingLink>
    </div>
  ),
  slots: {
    EstimatedTime: { className: "text-sm text-muted-foreground" },
    StatusBadge: {
      className:
        "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-medium",
    },
    TrackingLink: {
      className: "text-sm font-medium underline underline-offset-4",
    },
  },
});
