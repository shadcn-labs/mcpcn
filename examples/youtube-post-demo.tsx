"use client";

import {
  YouTubePost,
  YouTubePostAvatar,
  YouTubePostDetails,
  YouTubePostInfo,
  YouTubePostMenu,
  YouTubePostPlayer,
} from "@/registry/social/youtube-post";

export default function YouTubePostDemo() {
  return (
    <YouTubePost>
      <YouTubePostPlayer />
      <YouTubePostInfo>
        <div className="flex gap-3">
          <YouTubePostAvatar />
          <YouTubePostDetails />
          <YouTubePostMenu />
        </div>
      </YouTubePostInfo>
    </YouTubePost>
  );
}
