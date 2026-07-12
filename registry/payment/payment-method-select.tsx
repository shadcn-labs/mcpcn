"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface PaymentMethodContextValue {
  name: string;
  onSelect?: (method: string) => void;
  selectedMethod?: string;
}

const { Provider, useCompoundContext } =
  createCompoundContext<PaymentMethodContextValue>("PaymentMethodSelect");

export interface PaymentMethodSelectProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect"
> {
  name?: string;
  onSelect?: (method: string) => void;
  selectedMethod?: string;
}

interface OptionProps extends ComponentPropsWithoutRef<"label"> {
  description?: string;
  icon?: ReactNode;
  label?: string;
  value?: string;
}

function Option({
  description,
  icon,
  label = "Payment method",
  value = "method",
  className,
  children,
  ...props
}: OptionProps) {
  const { name, onSelect, selectedMethod } = useCompoundContext();
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors has-[:checked]:border-foreground",
        className
      )}
      {...props}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selectedMethod === value}
        onChange={() => onSelect?.(value)}
      />
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{label}</span>
        {description ? (
          <span className="block text-sm text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

function TermsCheckbox({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"label">) {
  useCompoundContext();
  return (
    <label
      className={cn(
        "flex items-start gap-2 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <input type="checkbox" className="mt-0.5" />
      <span>{children ?? "I agree to the payment terms"}</span>
    </label>
  );
}

function PaymentMethodSelectRoot({
  name = "payment-method",
  onSelect,
  selectedMethod,
  className,
  children,
  ...props
}: PaymentMethodSelectProps) {
  return (
    <Provider value={{ name, onSelect, selectedMethod }}>
      <div
        className={cn(
          "w-full space-y-3 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Option
              value="card"
              label="Credit or debit card"
              description="Visa, Mastercard, or Amex"
            />
            <Option
              value="wallet"
              label="Digital wallet"
              description="Apple Pay or Google Pay"
            />
            <Option
              value="bank"
              label="Bank transfer"
              description="Usually arrives in 1–2 business days"
            />
            <TermsCheckbox />
          </>
        )}
      </div>
    </Provider>
  );
}

export const PaymentMethodSelect = Object.assign(PaymentMethodSelectRoot, {
  Option,
  TermsCheckbox,
});
