"use client";

import { Check, Clock, RefreshCcw } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";

import { createCompoundBlock, formatPrice } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  currency?: string;
  onSupport?: () => void;
  formatPrice: (value: number) => string;
}

export interface RefundStatusProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  currency?: string;
  onSupport?: () => void;
}

export const RefundStatus = createCompoundBlock<
  ActionContext,
  RefundStatusProps
>({
  buildContext: (props) => ({
    currency: props.currency ?? "USD",
    formatPrice: (value: number) => formatPrice(value, props.currency ?? "USD"),
    onSupport: props.onSupport,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "RefundStatus",
  renderDefault: () => (
    <div className="space-y-4">
      <RefundStatus.Header>
        <div className="flex items-center gap-3">
          <RefreshCcw className="h-5 w-5" />
          <div>
            <p className="font-semibold">Refundstatus</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </RefundStatus.Header>
      <RefundStatus.RefundAmount>
        <p className="text-sm text-muted-foreground">
          Sample refundamount content that can be fully replaced by children.
        </p>
      </RefundStatus.RefundAmount>
      <RefundStatus.Timeline>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Received</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Processing</span>
          </div>
        </div>
      </RefundStatus.Timeline>
      <RefundStatus.ContactSupport />
    </div>
  ),
  slots: {
    ContactSupport: {
      render: ({ className, children }, context) => (
        <Button
          className={className}
          variant="outline"
          onClick={(context as { onSupport?: () => void }).onSupport}
        >
          {children ?? "Contact support"}
        </Button>
      ),
    },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    RefundAmount: {
      className: "rounded-lg bg-muted p-4 text-center font-semibold",
    },
    Timeline: { className: "rounded-lg border p-3" },
  },
});
