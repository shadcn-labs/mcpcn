"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  validateEmail?: (value: string) => boolean;
}

export interface EmailInputProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  validateEmail?: (value: string) => boolean;
}

export const EmailInput = createCompoundBlock<ActionContext, EmailInputProps>({
  buildContext: (props) => ({ validateEmail: props.validateEmail }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "EmailInput",
  renderDefault: () => (
    <div className="space-y-4">
      <EmailInput.Input />
      <EmailInput.HelpText>
        <p className="text-sm text-muted-foreground">
          Sample helptext content that can be fully replaced by children.
        </p>
      </EmailInput.HelpText>
      <EmailInput.ErrorMessage>
        <p className="text-sm text-muted-foreground">
          Sample errormessage content that can be fully replaced by children.
        </p>
      </EmailInput.ErrorMessage>
    </div>
  ),
  slots: {
    ErrorMessage: { className: "text-xs text-destructive" },
    HelpText: { className: "text-xs text-muted-foreground" },
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
