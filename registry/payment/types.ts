import type { TimelineStep } from "../_lib/compound";

export interface OrderItem {
  image?: string;
  name: string;
  price: number;
  quantity?: number;
  sku?: string;
  variant?: string;
}

export interface PaymentMethod {
  description?: string;
  label: string;
  value: string;
}

export interface RefundDetails {
  amount: number;
  steps: TimelineStep[];
}
