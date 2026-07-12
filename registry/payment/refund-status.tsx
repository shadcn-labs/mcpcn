"use client";

import { Check, Clock, RefreshCcw } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  createCompoundContext,
  formatPrice,
  statusClasses,
} from "../_lib/compound";
import type { TimelineStep } from "../_lib/compound";

interface RefundStatusContextValue {
  formatPrice: (value: number) => string;
  onSupport?: () => void;
}

const { Provider, useCompoundContext } =
  createCompoundContext<RefundStatusContextValue>("RefundStatus");

export interface RefundStatusProps extends ComponentPropsWithoutRef<"div"> {
  currency?: string;
  onSupport?: () => void;
}

function Header({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  useCompoundContext();
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <RefreshCcw className="h-5 w-5" />
      </div>
      <div>
        {children ?? (
          <>
            <h2 className="font-semibold">Refund in progress</h2>
            <p className="text-sm text-muted-foreground">
              We’ll notify you when the funds arrive.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

interface RefundAmountProps extends ComponentPropsWithoutRef<"div"> {
  amount?: number;
}

function RefundAmount({
  amount = 99.99,
  className,
  children,
  ...props
}: RefundAmountProps) {
  const context = useCompoundContext();
  return (
    <div
      className={cn("rounded-lg bg-muted p-4 text-center", className)}
      {...props}
    >
      {children ?? (
        <>
          <p className="text-sm text-muted-foreground">Refund amount</p>
          <p className="text-2xl font-semibold">
            {context.formatPrice(amount)}
          </p>
        </>
      )}
    </div>
  );
}

interface TimelineProps extends ComponentPropsWithoutRef<"ol"> {
  steps?: TimelineStep[];
}
const defaultSteps: TimelineStep[] = [
  { label: "Refund requested", status: "completed" },
  {
    description: "Usually 3–5 business days",
    label: "Payment provider processing",
    status: "current",
  },
  { label: "Funds returned", status: "pending" },
];

function Timeline({
  steps = defaultSteps,
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

function ContactSupport({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { onSupport } = useCompoundContext();
  return (
    <Button
      variant="outline"
      className={className}
      onClick={onSupport}
      {...props}
    >
      {children ?? "Contact support"}
    </Button>
  );
}

function RefundStatusRoot({
  currency = "USD",
  onSupport,
  className,
  children,
  ...props
}: RefundStatusProps) {
  return (
    <Provider
      value={{
        formatPrice: (value) => formatPrice(value, currency),
        onSupport,
      }}
    >
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <RefundAmount />
            <Timeline />
            <ContactSupport />
          </>
        )}
      </div>
    </Provider>
  );
}

export const RefundStatus = Object.assign(RefundStatusRoot, {
  ContactSupport,
  Header,
  RefundAmount,
  Timeline,
});
