"use client";

import { OrderTimeline } from "@/registry/status/order-timeline";

export default function OrderTimelineDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderTimeline />
      <OrderTimeline>
        <OrderTimeline.Step status="completed">
          <OrderTimeline.Connector />
          <OrderTimeline.Label>Payment authorized</OrderTimeline.Label>
        </OrderTimeline.Step>
        <OrderTimeline.Step
          status="current"
          icon={<span className="text-xs">●</span>}
          label="Preparing custom order"
        />
      </OrderTimeline>
    </div>
  );
}
