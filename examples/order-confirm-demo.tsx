"use client";

import { OrderConfirm } from "@/registry/payment/order-confirm";

export default function OrderConfirmDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderConfirm />
      <OrderConfirm>
        <OrderConfirm.Header>
          <div>
            <p className="font-semibold">Custom Order Confirm</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </OrderConfirm.Header>
        <OrderConfirm.ItemRow>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </OrderConfirm.ItemRow>
      </OrderConfirm>
    </div>
  );
}
