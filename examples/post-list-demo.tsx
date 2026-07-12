"use client";

import { PostList } from "@/registry/blogging/post-list";

export default function PostListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PostList />
      <PostList>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <PostList.Content />
        </div>
      </PostList>
    </div>
  );
}
