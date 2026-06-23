"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  formatPhone?: (value: string) => string;
}

export interface PhoneInputProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  formatPhone?: (value: string) => string;
}

export const PhoneInput = createCompoundBlock<ActionContext, PhoneInputProps>({
  buildContext: (props) => ({ formatPhone: props.formatPhone }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "PhoneInput",
  renderDefault: () => (
    <div className="space-y-4">
      <PhoneInput.CountrySelect />
      <PhoneInput.Input />
      <PhoneInput.FormatHint>
        <p className="text-sm text-muted-foreground">
          Sample formathint content that can be fully replaced by children.
        </p>
      </PhoneInput.FormatHint>
    </div>
  ),
  slots: {
    CountrySelect: {
      render: ({ className, children }) =>
        children ?? (
          <input
            className={cn(
              "w-full rounded-md border bg-background px-3 py-2 text-sm",
              className
            )}
            placeholder="Country select"
          />
        ),
    },
    FormatHint: { className: "text-xs text-muted-foreground" },
    Input: {
      render: ({ className, children }) =>
        children ?? (
          <input
            className={cn(
              "w-full rounded-md border bg-background px-3 py-2 text-sm",
              className
            )}
            placeholder="Enter value"
          />
        ),
    },
  },
});
