"use client";

import { Star } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onSubmit?: (rating: number, feedback?: string) => void;
}

export interface RatingCardProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onSubmit?: (rating: number, feedback?: string) => void;
}

export const RatingCard = createCompoundBlock<ActionContext, RatingCardProps>({
  buildContext: (props) => ({ onSubmit: props.onSubmit }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "RatingCard",
  renderDefault: () => (
    <div className="space-y-4">
      <RatingCard.Stars>
        <p className="text-sm text-muted-foreground">
          Sample stars content that can be fully replaced by children.
        </p>
      </RatingCard.Stars>
      <RatingCard.FeedbackInput />
      <RatingCard.SubmitButton />
    </div>
  ),
  slots: {
    FeedbackInput: {
      render: ({ className, children }) =>
        children ?? (
          <textarea
            className={cn(
              "min-h-20 w-full rounded-md border bg-background px-3 py-2 text-sm",
              className
            )}
            placeholder="Feedback"
          />
        ),
    },
    Stars: {
      render: ({ className, children }) =>
        children ? (
          <div className={cn("flex gap-1", className)}>{children}</div>
        ) : (
          <div className={cn("flex gap-1", className)}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        ),
    },
    SubmitButton: {
      render: ({ className, children }, context) => (
        <Button
          className={className}
          onClick={() =>
            (context as { onSubmit?: (rating: number) => void }).onSubmit?.(5)
          }
        >
          {children ?? "Submit"}
        </Button>
      ),
    },
  },
});
