"use client";

import { PostCard, PostCardContent } from "@/registry/blogging/post-card";

export default function PostCardCompactDemo() {
  return (
    <PostCard appearance={{ variant: "compact" }}>
      <PostCardContent />
    </PostCard>
  );
}
