"use client";

import { OrderStatus } from "@/registry/payment/order-status";

export default function OrderStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderStatus />
      <OrderStatus>
        <OrderStatus.Header>
          <div>
            <p className="font-semibold">Custom Order Status</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </OrderStatus.Header>
        <OrderStatus.StatusBadge>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </OrderStatus.StatusBadge>
      </OrderStatus>
    </div>
  );
}
