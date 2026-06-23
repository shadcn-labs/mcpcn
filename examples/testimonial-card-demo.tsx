"use client";

import { TestimonialCard } from "@/registry/miscellaneous/testimonial-card";

export default function TestimonialCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TestimonialCard />
      <TestimonialCard>
        <TestimonialCard.Header>
          <div>
            <p className="font-semibold">Custom Testimonial Card</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </TestimonialCard.Header>
        <TestimonialCard.Author>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </TestimonialCard.Author>
      </TestimonialCard>
    </div>
  );
}
