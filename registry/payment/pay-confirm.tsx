"use client";

import { ShieldCheck } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundBlock, formatPrice } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  currency?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  formatPrice: (value: number) => string;
}

export interface PayConfirmProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  currency?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const PayConfirm = createCompoundBlock<ActionContext, PayConfirmProps>({
  buildContext: (props) => ({
    currency: props.currency ?? "USD",
    formatPrice: (value: number) => formatPrice(value, props.currency ?? "USD"),
    onCancel: props.onCancel,
    onConfirm: props.onConfirm,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "PayConfirm",
  renderDefault: () => (
    <div className="space-y-4">
      <PayConfirm.Header>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5" />
          <div>
            <p className="font-semibold">Payconfirm</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </PayConfirm.Header>
      <PayConfirm.CardPreview>
        <p className="text-sm text-muted-foreground">
          Sample cardpreview content that can be fully replaced by children.
        </p>
      </PayConfirm.CardPreview>
      <PayConfirm.Amount>
        <p className="text-sm text-muted-foreground">
          Sample amount content that can be fully replaced by children.
        </p>
      </PayConfirm.Amount>
      <PayConfirm.Disclaimer>
        <p className="text-sm text-muted-foreground">
          Sample disclaimer content that can be fully replaced by children.
        </p>
      </PayConfirm.Disclaimer>
      <PayConfirm.Actions />
    </div>
  ),
  slots: {
    Actions: {
      render: ({ className, children }, context) =>
        children ? (
          <div className={cn("flex gap-2", className)}>{children}</div>
        ) : (
          <div className={cn("flex gap-2", className)}>
            <Button
              variant="outline"
              onClick={(context as { onCancel?: () => void }).onCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={
                (context as { onConfirm?: () => void }).onConfirm ??
                (context as { onLike?: () => void }).onLike ??
                (context as { onPlay?: () => void }).onPlay
              }
            >
              Continue
            </Button>
          </div>
        ),
    },
    Amount: {
      className: "rounded-lg bg-muted p-4 text-center text-2xl font-semibold",
    },
    CardPreview: { className: "rounded-lg border bg-muted/30 p-4" },
    Disclaimer: { className: "text-xs text-muted-foreground" },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
  },
});
