"use client";

import { PostDetail } from "@/registry/blogging/post-detail";

export default function PostDetailDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PostDetail />
      <PostDetail>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <PostDetail.Content />
        </div>
      </PostDetail>
    </div>
  );
}
