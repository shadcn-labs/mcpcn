"use client";

import { OrderConfirm } from "@/registry/payment/order-confirm";

export default function OrderConfirmDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OrderConfirm />
      <OrderConfirm orderNumber="#MCP-2048">
        <OrderConfirm.Header>Registry order</OrderConfirm.Header>
        <OrderConfirm.ItemRow
          name="Compound component pack"
          sku="COMPOSE-21"
          quantity={1}
          price={129}
        >
          <span className="text-xs text-muted-foreground">
            Includes all categories
          </span>
        </OrderConfirm.ItemRow>
        <OrderConfirm.PriceBreakdown>
          <div className="flex justify-between">
            <span>Registry delivery</span>
            <span>Free</span>
          </div>
        </OrderConfirm.PriceBreakdown>
        <OrderConfirm.Total value={129} />
        <OrderConfirm.Action
          deliveryDate="Available now"
          deliveryAddress="Your workspace"
        />
      </OrderConfirm>
    </div>
  );
}
