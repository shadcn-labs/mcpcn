"use client";

import { DeliveryStatus } from "@/registry/status/delivery-status";

export default function DeliveryStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DeliveryStatus />
      <DeliveryStatus>
        <DeliveryStatus.StatusBadge status="Courier nearby" />
        <DeliveryStatus.EstimatedTime value="Within 20 minutes" />
        <DeliveryStatus.TrackingLink href="#" trackingNumber="MCP-2048">
          Open live map
        </DeliveryStatus.TrackingLink>
      </DeliveryStatus>
    </div>
  );
}
