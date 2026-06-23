"use client";

import { DeliveryStatus } from "@/registry/status/delivery-status";

export default function DeliveryStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DeliveryStatus />
      <DeliveryStatus>
        <DeliveryStatus.Header>
          <div>
            <p className="font-semibold">Custom Delivery Status</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </DeliveryStatus.Header>
        <DeliveryStatus.EstimatedTime>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </DeliveryStatus.EstimatedTime>
      </DeliveryStatus>
    </div>
  );
}
