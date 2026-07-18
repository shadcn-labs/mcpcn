"use client";

import {
  PaymentConfirmed,
  PaymentConfirmedContent,
} from "@/registry/payment/payment-confirmed";

export default function PaymentConfirmedDemo() {
  return (
    <PaymentConfirmed>
      <PaymentConfirmedContent />
    </PaymentConfirmed>
  );
}
