"use client";

import { InstagramPost } from "@/registry/social/instagram-post";

export default function InstagramPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InstagramPost />
      <InstagramPost>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <InstagramPost.Content />
        </div>
      </InstagramPost>
    </div>
  );
}
