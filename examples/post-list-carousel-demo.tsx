"use client";

import { PostList, PostListContent } from "@/registry/blogging/post-list";

export default function PostListCarouselDemo() {
  return (
    <PostList appearance={{ variant: "carousel" }}>
      <PostListContent />
    </PostList>
  );
}
