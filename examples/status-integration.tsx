"use client";

import { DeliveryStatus } from "@/registry/status/delivery-status";
import { OrderTimeline } from "@/registry/status/order-timeline";

export default function StatusIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <OrderTimeline />
      <DeliveryStatus />
    </div>
  );
}
