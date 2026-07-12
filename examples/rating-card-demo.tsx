"use client";

import { RatingCard } from "@/registry/miscellaneous/rating-card";

export default function RatingCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RatingCard />
      <RatingCard defaultRating={4}>
        <p className="font-semibold">Rate this component</p>
        <RatingCard.Stars />
        <RatingCard.FeedbackInput placeholder="Tell the registry author more…" />
        <RatingCard.SubmitButton>Send review</RatingCard.SubmitButton>
      </RatingCard>
    </div>
  );
}
