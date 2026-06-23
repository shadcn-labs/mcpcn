"use client";

import { InstagramPost } from "@/registry/social/instagram-post";
import { TwitterPost } from "@/registry/social/twitter-post";
import { YoutubeEmbed } from "@/registry/social/youtube-embed";

export default function SocialIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InstagramPost onLike={() => console.info("mcpcn action")} />
      <TwitterPost onLike={() => console.info("mcpcn action")} />
      <YoutubeEmbed onPlay={() => console.info("mcpcn action")} />
    </div>
  );
}
