"use client";

import { InstagramPost } from "@/registry/social/instagram-post";

export default function InstagramPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <InstagramPost />
      <InstagramPost>
        <InstagramPost.Header name="mcpcn" handle="@compound_components">
          <span className="ml-auto rounded-full bg-muted px-2 py-1 text-xs">
            Following
          </span>
        </InstagramPost.Header>
        <InstagramPost.Image>
          <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-violet-500 to-orange-400 text-2xl font-bold text-white">
            Compose everything.
          </div>
        </InstagramPost.Image>
        <InstagramPost.Actions />
        <InstagramPost.Caption
          handle="mcpcn"
          text="No prop can predict every interface."
        />
      </InstagramPost>
    </div>
  );
}
