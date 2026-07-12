"use client";

import { OrderConfirm } from "@/registry/payment/order-confirm";

export default function OrderConfirmDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderConfirm />
      <OrderConfirm>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <OrderConfirm.Content />
        </div>
      </OrderConfirm>
    </div>
  );
}
