"use client";

import { YoutubeEmbed } from "@/registry/social/youtube-embed";

export default function YoutubeEmbedDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <YoutubeEmbed />
      <YoutubeEmbed>
        <YoutubeEmbed.Header>
          <div>
            <p className="font-semibold">Custom Youtube Embed</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </YoutubeEmbed.Header>
        <YoutubeEmbed.VideoThumbnail>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </YoutubeEmbed.VideoThumbnail>
      </YoutubeEmbed>
    </div>
  );
}
