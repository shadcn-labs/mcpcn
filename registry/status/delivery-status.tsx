"use client";

import { ExternalLink, Truck } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

const { Provider, useCompoundContext } =
  createCompoundContext<Record<string, never>>("DeliveryStatus");
export type DeliveryStatusProps = ComponentPropsWithoutRef<"div">;

interface StatusBadgeProps extends ComponentPropsWithoutRef<"span"> {
  status?: string;
}
function StatusBadge({
  status = "Out for delivery",
  className,
  children,
  ...props
}: StatusBadgeProps) {
  useCompoundContext();
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        className
      )}
      {...props}
    >
      <Truck className="h-3.5 w-3.5" />
      {children ?? status}
    </span>
  );
}
interface EstimatedTimeProps extends ComponentPropsWithoutRef<"p"> {
  value?: string;
}
function EstimatedTime({
  value = "Today, 2:00–6:00 PM",
  className,
  children,
  ...props
}: EstimatedTimeProps) {
  useCompoundContext();
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children ?? (
        <>
          Estimated arrival{" "}
          <span className="font-medium text-foreground">{value}</span>
        </>
      )}
    </p>
  );
}
interface TrackingLinkProps extends ComponentPropsWithoutRef<"a"> {
  trackingNumber?: string;
}
function TrackingLink({
  trackingNumber = "1Z999AA10123456784",
  className,
  children,
  ...props
}: TrackingLinkProps) {
  useCompoundContext();
  return (
    <a
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children ?? `Track ${trackingNumber}`}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
function DeliveryStatusRoot({
  className,
  children,
  ...props
}: DeliveryStatusProps) {
  return (
    <Provider value={{}}>
      <div
        className={cn(
          "w-full space-y-3 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <StatusBadge />
            <EstimatedTime />
            <TrackingLink href="#" />
          </>
        )}
      </div>
    </Provider>
  );
}
export const DeliveryStatus = Object.assign(DeliveryStatusRoot, {
  EstimatedTime,
  StatusBadge,
  TrackingLink,
});
