"use client";

import { OrderConfirm } from "@/registry/payment/order-confirm";
import { PayConfirm } from "@/registry/payment/pay-confirm";

export default function PaymentIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <OrderConfirm onConfirm={() => console.info("mcpcn action")} />
      <PayConfirm
        onConfirm={() => console.info("mcpcn action")}
        onCancel={() => console.info("mcpcn action")}
      />
    </div>
  );
}
