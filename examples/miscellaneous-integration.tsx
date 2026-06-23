"use client";

import { RatingCard } from "@/registry/miscellaneous/rating-card";
import { TestimonialCard } from "@/registry/miscellaneous/testimonial-card";

export default function MiscellaneousIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <RatingCard onSubmit={() => console.info("mcpcn action")} />
      <TestimonialCard />
    </div>
  );
}
