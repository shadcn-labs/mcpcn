"use client";

import { OrderTimeline } from "@/registry/status/order-timeline";

export default function OrderTimelineDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderTimeline />
      <OrderTimeline>
        <OrderTimeline.Header>
          <div>
            <p className="font-semibold">Custom Order Timeline</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </OrderTimeline.Header>
        <OrderTimeline.Label>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </OrderTimeline.Label>
      </OrderTimeline>
    </div>
  );
}
