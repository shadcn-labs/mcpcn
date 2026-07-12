"use client";

import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext, statusClasses } from "../_lib/compound";
import type { StepStatus } from "../_lib/compound";

const { Provider, useCompoundContext } =
  createCompoundContext<Record<string, never>>("OrderTimeline");
export type OrderTimelineProps = ComponentPropsWithoutRef<"ol">;

function Label({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  useCompoundContext();
  return (
    <span className={cn("block text-sm font-medium", className)} {...props}>
      {children}
    </span>
  );
}

interface StepProps extends ComponentPropsWithoutRef<"li"> {
  description?: string;
  icon?: ReactNode;
  label?: string;
  status?: StepStatus;
}
function Step({
  description,
  icon,
  label = "Order placed",
  status = "pending",
  className,
  children,
  ...props
}: StepProps) {
  useCompoundContext();
  return (
    <li
      className={cn("relative flex gap-3 pb-6 last:pb-0", className)}
      {...props}
    >
      <span className={statusClasses(status)}>
        {icon ??
          (status === "completed" ? <Check className="h-3.5 w-3.5" /> : null)}
      </span>
      <div className="min-w-0">
        {children ?? (
          <>
            <Label>{label}</Label>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </>
        )}
      </div>
    </li>
  );
}
function Connector({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  useCompoundContext();
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-3 top-6 h-[calc(100%-1.5rem)] w-px bg-border",
        className
      )}
      {...props}
    />
  );
}
function OrderTimelineRoot({
  className,
  children,
  ...props
}: OrderTimelineProps) {
  return (
    <Provider value={{}}>
      <ol
        className={cn("w-full rounded-xl border bg-card p-4 sm:p-6", className)}
        {...props}
      >
        {children ?? (
          <>
            <Step
              label="Order placed"
              description="Jan 16 · 9:42 AM"
              status="completed"
            >
              <Connector />
              <Label>Order placed</Label>
              <p className="text-xs text-muted-foreground">Jan 16 · 9:42 AM</p>
            </Step>
            <Step
              label="Shipped"
              description="Jan 17 · 3:18 PM"
              status="completed"
            >
              <Connector />
              <Label>Shipped</Label>
              <p className="text-xs text-muted-foreground">Jan 17 · 3:18 PM</p>
            </Step>
            <Step label="In transit" status="current" />
            <Step label="Delivered" />
          </>
        )}
      </ol>
    </Provider>
  );
}
export const OrderTimeline = Object.assign(OrderTimelineRoot, {
  Connector,
  Label,
  Step,
});
