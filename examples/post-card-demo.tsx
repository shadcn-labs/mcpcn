"use client";

import { PostCard } from "@/registry/blogging/post-card";

export default function PostCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PostCard />
      <PostCard>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <PostCard.Content />
        </div>
      </PostCard>
    </div>
  );
}
