"use client";

import { Quote } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { createCompoundBlock } from "../_lib/compound";

type ActionContext = Record<string, unknown>;

export type TestimonialCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
>;

export const TestimonialCard = createCompoundBlock<
  ActionContext,
  TestimonialCardProps
>({
  buildContext: () => ({}),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "TestimonialCard",
  renderDefault: () => (
    <div className="space-y-4">
      <TestimonialCard.Quote>
        <p className="text-sm text-muted-foreground">
          Sample quote content that can be fully replaced by children.
        </p>
      </TestimonialCard.Quote>
      <TestimonialCard.Author>
        <p className="text-sm text-muted-foreground">
          Sample author content that can be fully replaced by children.
        </p>
      </TestimonialCard.Author>
      <TestimonialCard.Avatar>
        <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
          <Quote className="h-8 w-8 text-muted-foreground" />
        </div>
      </TestimonialCard.Avatar>
      <TestimonialCard.Metadata>
        <p className="text-sm text-muted-foreground">
          Sample metadata content that can be fully replaced by children.
        </p>
      </TestimonialCard.Metadata>
    </div>
  ),
  slots: {
    Author: { className: "font-semibold" },
    Avatar: { className: "h-12 w-12 overflow-hidden rounded-full bg-muted" },
    Metadata: { className: "text-xs text-muted-foreground" },
    Quote: { className: "text-base font-medium leading-relaxed" },
  },
});
