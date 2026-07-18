"use client";

import { PostCard, PostCardContent } from "@/registry/blogging/post-card";

export default function PostCardCoveredDemo() {
  return (
    <PostCard appearance={{ variant: "covered" }}>
      <PostCardContent />
    </PostCard>
  );
}
