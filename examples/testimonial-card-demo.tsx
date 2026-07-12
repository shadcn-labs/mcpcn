"use client";

import { TestimonialCard } from "@/registry/miscellaneous/testimonial-card";

export default function TestimonialCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TestimonialCard />
      <TestimonialCard>
        <TestimonialCard.Quote>
          We replaced three rigid widgets with one composition that fits every
          workflow.
        </TestimonialCard.Quote>
        <div className="flex items-center gap-3">
          <TestimonialCard.Avatar name="Priya Rao">
            <span>PR</span>
          </TestimonialCard.Avatar>
          <div>
            <TestimonialCard.Author name="Priya Rao" />
            <TestimonialCard.Metadata
              jobTitle="Design engineer"
              company="Orbit"
              rating={5}
            />
          </div>
        </div>
      </TestimonialCard>
    </div>
  );
}
