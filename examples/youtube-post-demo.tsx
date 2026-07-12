"use client";

import { YouTubePost } from "@/registry/social/youtube-post";

export default function YouTubePostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <YouTubePost />
      <YouTubePost>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <YouTubePost.Content />
        </div>
      </YouTubePost>
    </div>
  );
}
