"use client";

import { Check, Clock } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext, statusClasses } from "../_lib/compound";
import type { TimelineStep } from "../_lib/compound";

const { Provider, useCompoundContext } =
  createCompoundContext<Record<string, never>>("OrderStatus");

export type OrderStatusProps = ComponentPropsWithoutRef<"div">;

interface TrackingNumberProps extends ComponentPropsWithoutRef<"div"> {
  value?: string;
}

function TrackingNumber({
  value = "1Z999AA10123456784",
  className,
  children,
  ...props
}: TrackingNumberProps) {
  useCompoundContext();
  return (
    <div className={cn("rounded-lg bg-muted/40 p-3", className)} {...props}>
      {children ?? (
        <>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Tracking number
          </p>
          <p className="font-mono text-sm">{value}</p>
        </>
      )}
    </div>
  );
}

interface StatusBadgeProps extends ComponentPropsWithoutRef<"span"> {
  status?: string;
}

function StatusBadge({
  status = "In transit",
  className,
  children,
  ...props
}: StatusBadgeProps) {
  useCompoundContext();
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        className
      )}
      {...props}
    >
      {children ?? status}
    </span>
  );
}

interface TimelineProps extends ComponentPropsWithoutRef<"ol"> {
  steps?: TimelineStep[];
}

function Timeline({
  steps = [],
  className,
  children,
  ...props
}: TimelineProps) {
  useCompoundContext();
  return (
    <ol className={cn("space-y-3 rounded-lg border p-4", className)} {...props}>
      {children ??
        steps.map((step) => (
          <li key={step.label} className="flex gap-3">
            <span className={statusClasses(step.status)}>
              {step.status === "completed" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
            </span>
            <span>
              <span className="block text-sm font-medium">{step.label}</span>
              {step.description ? (
                <span className="block text-xs text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
          </li>
        ))}
    </ol>
  );
}

interface EstimatedDeliveryProps extends ComponentPropsWithoutRef<"p"> {
  value?: string;
}

function EstimatedDelivery({
  value = "Friday, January 20",
  className,
  children,
  ...props
}: EstimatedDeliveryProps) {
  useCompoundContext();
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children ?? (
        <>
          Estimated delivery:{" "}
          <span className="font-medium text-foreground">{value}</span>
        </>
      )}
    </p>
  );
}

const defaultSteps: TimelineStep[] = [
  {
    description: "January 16 · 9:42 AM",
    label: "Order received",
    status: "completed",
  },
  {
    description: "January 17 · 3:18 PM",
    label: "Shipped",
    status: "completed",
  },
  {
    description: "Arrived at regional facility",
    label: "In transit",
    status: "current",
  },
  { label: "Delivered", status: "pending" },
];

function OrderStatusRoot({ className, children, ...props }: OrderStatusProps) {
  return (
    <Provider value={{}}>
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div className="flex items-center justify-between gap-3">
              <TrackingNumber />
              <StatusBadge />
            </div>
            <Timeline steps={defaultSteps} />
            <EstimatedDelivery />
          </>
        )}
      </div>
    </Provider>
  );
}

export const OrderStatus = Object.assign(OrderStatusRoot, {
  EstimatedDelivery,
  StatusBadge,
  Timeline,
  TrackingNumber,
});
