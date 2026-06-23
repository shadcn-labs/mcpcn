"use client";

import { InstagramPost } from "@/registry/social/instagram-post";

export default function InstagramPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InstagramPost />
      <InstagramPost>
        <InstagramPost.Header>
          <div>
            <p className="font-semibold">Custom Instagram Post</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </InstagramPost.Header>
        <InstagramPost.Image>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </InstagramPost.Image>
      </InstagramPost>
    </div>
  );
}
