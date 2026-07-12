"use client";

import { YoutubeEmbed } from "@/registry/social/youtube-embed";

export default function YoutubeEmbedDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <YoutubeEmbed />
      <YoutubeEmbed>
        <YoutubeEmbed.Header channel="mcpcn" subscribers="New registry" />
        <YoutubeEmbed.VideoThumbnail>
          <div className="aspect-video bg-gradient-to-br from-red-500 to-fuchsia-700" />
        </YoutubeEmbed.VideoThumbnail>
        <YoutubeEmbed.Description
          title="Composition without limits"
          description="A practical tour of compound MCP App blocks."
        />
        <YoutubeEmbed.Actions />
      </YoutubeEmbed>
    </div>
  );
}
