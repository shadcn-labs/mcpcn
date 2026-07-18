"use client";

import { PostCard, PostCardContent } from "@/registry/blogging/post-card";

export default function PostCardWithoutImageDemo() {
  return (
    <PostCard appearance={{ showImage: false }}>
      <PostCardContent />
    </PostCard>
  );
}
