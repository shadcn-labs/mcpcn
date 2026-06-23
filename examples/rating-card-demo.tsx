"use client";

import { RatingCard } from "@/registry/miscellaneous/rating-card";

export default function RatingCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RatingCard />
      <RatingCard>
        <RatingCard.Header>
          <div>
            <p className="font-semibold">Custom Rating Card</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </RatingCard.Header>
        <RatingCard.FeedbackInput>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </RatingCard.FeedbackInput>
      </RatingCard>
    </div>
  );
}
