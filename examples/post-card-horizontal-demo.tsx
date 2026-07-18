"use client";

import { PostCard, PostCardContent } from "@/registry/blogging/post-card";

export default function PostCardHorizontalDemo() {
  return (
    <PostCard appearance={{ variant: "horizontal" }}>
      <PostCardContent />
    </PostCard>
  );
}
