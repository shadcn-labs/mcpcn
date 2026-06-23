"use client";

import { TwitterPost } from "@/registry/social/twitter-post";

export default function TwitterPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TwitterPost />
      <TwitterPost>
        <TwitterPost.Header>
          <div>
            <p className="font-semibold">Custom Twitter Post</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </TwitterPost.Header>
        <TwitterPost.Text>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </TwitterPost.Text>
      </TwitterPost>
    </div>
  );
}
