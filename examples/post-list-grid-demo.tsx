"use client";

import { PostList, PostListContent } from "@/registry/blogging/post-list";

export default function PostListGridDemo() {
  return (
    <PostList appearance={{ variant: "grid" }}>
      <PostListContent />
    </PostList>
  );
}
