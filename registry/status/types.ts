import type { StepStatus } from "../_lib/compound";

export interface StatusStep {
  description?: string;
  label: string;
  status?: StepStatus;
}

export interface DeliveryEstimate {
  status: string;
  trackingNumber?: string;
  value: string;
}
