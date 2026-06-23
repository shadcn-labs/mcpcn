"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onSelect?: (method: string) => void;
}

export interface PaymentMethodSelectProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onSelect?: (method: string) => void;
}

export const PaymentMethodSelect = createCompoundBlock<
  ActionContext,
  PaymentMethodSelectProps
>({
  buildContext: (props) => ({ onSelect: props.onSelect }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "PaymentMethodSelect",
  renderDefault: () => (
    <div className="space-y-4">
      <PaymentMethodSelect.Option>
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Sample option</span>
          <span className="text-sm text-muted-foreground">Ready</span>
        </div>
      </PaymentMethodSelect.Option>
      <PaymentMethodSelect.TermsCheckbox />
    </div>
  ),
  slots: {
    Option: { className: "rounded-lg border p-3" },
    TermsCheckbox: {
      render: ({ className, children }) => (
        <label
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground",
            className
          )}
        >
          <input type="checkbox" />
          {children ?? "I agree to the terms"}
        </label>
      ),
    },
  },
});
