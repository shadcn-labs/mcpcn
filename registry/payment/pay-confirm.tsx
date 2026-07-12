"use client";

import { Check, CreditCard, ShieldCheck } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { createCompoundContext, formatPrice } from "../_lib/compound";

interface PayConfirmContextValue {
  currency: string;
  formatPrice: (value: number) => string;
  isLoading: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const { Provider, useCompoundContext } =
  createCompoundContext<PayConfirmContextValue>("PayConfirm");

export interface PayConfirmProps extends ComponentPropsWithoutRef<"div"> {
  currency?: string;
  isLoading?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

function Header({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  useCompoundContext();
  return (
    <div className={cn("text-center", className)} {...props}>
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <ShieldCheck className="h-5 w-5" />
      </div>
      {children ?? (
        <>
          <h2 className="font-semibold leading-none tracking-tight">
            Confirm payment
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Review and confirm your payment details
          </p>
        </>
      )}
    </div>
  );
}

interface AmountProps extends ComponentPropsWithoutRef<"div"> {
  amount?: number;
}

function Amount({ amount, className, children, ...props }: AmountProps) {
  const context = useCompoundContext();
  return (
    <div
      className={cn("rounded-lg bg-muted p-4 text-center", className)}
      {...props}
    >
      {children ?? (
        <>
          <p className="text-sm text-muted-foreground">Amount to pay</p>
          <p className="text-2xl font-semibold">
            {context.formatPrice(amount ?? 99.99)}
          </p>
        </>
      )}
    </div>
  );
}

interface CardPreviewProps extends ComponentPropsWithoutRef<"div"> {
  brand?: string;
  last4?: string;
}

function CardPreview({
  brand = "Visa",
  last4 = "4242",
  className,
  children,
  ...props
}: CardPreviewProps) {
  useCompoundContext();
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{brand}</p>
              <p className="text-sm text-muted-foreground">•••• {last4}</p>
            </div>
          </div>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground">
            <Check className="h-3 w-3 text-background" />
          </div>
        </>
      )}
    </div>
  );
}

function Disclaimer({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  useCompoundContext();
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children ?? "Your payment details are encrypted and securely processed."}
    </p>
  );
}

function Actions({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { isLoading, onCancel, onConfirm } = useCompoundContext();
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      {children ?? (
        <>
          <Button
            className="flex-1"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button className="flex-1" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Processing…" : "Confirm"}
          </Button>
        </>
      )}
    </div>
  );
}

function PayConfirmRoot({
  currency = "USD",
  isLoading = false,
  onCancel,
  onConfirm,
  className,
  children,
  ...props
}: PayConfirmProps) {
  const value = {
    currency,
    formatPrice: (amount: number) => formatPrice(amount, currency),
    isLoading,
    onCancel,
    onConfirm,
  };

  return (
    <Provider value={value}>
      <Card
        className={cn("w-full max-w-md space-y-4 p-6", className)}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <Amount />
            <CardPreview />
            <Disclaimer />
            <Actions />
          </>
        )}
      </Card>
    </Provider>
  );
}

export const PayConfirm = Object.assign(PayConfirmRoot, {
  Actions,
  Amount,
  CardPreview,
  Disclaimer,
  Header,
});
