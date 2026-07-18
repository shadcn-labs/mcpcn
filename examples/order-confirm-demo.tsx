"use client";

import {
  OrderConfirm,
  OrderConfirmContent,
  OrderConfirmFooter,
  OrderConfirmProduct,
} from "@/registry/payment/order-confirm";

export default function OrderConfirmDemo() {
  return (
    <OrderConfirm>
      <OrderConfirmContent>
        <OrderConfirmProduct />
        <div className="border-t" />
        <OrderConfirmFooter />
      </OrderConfirmContent>
    </OrderConfirm>
  );
}
