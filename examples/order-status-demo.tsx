"use client";

import { OrderStatus } from "@/registry/payment/order-status";

export default function OrderStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderStatus />
      <OrderStatus>
        <div className="flex items-center justify-between gap-3">
          <OrderStatus.TrackingNumber value="MCP-2048" />
          <OrderStatus.StatusBadge status="Out for delivery" />
        </div>
        <OrderStatus.Timeline
          steps={[
            { label: "Dispatched", status: "completed" },
            { label: "Courier nearby", status: "current" },
            { label: "Delivered", status: "pending" },
          ]}
        />
        <OrderStatus.EstimatedDelivery>
          Arriving before 6 PM
        </OrderStatus.EstimatedDelivery>
      </OrderStatus>
    </div>
  );
}
