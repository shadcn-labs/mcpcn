"use client";

import { TwitterPost } from "@/registry/social/twitter-post";

export default function TwitterPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TwitterPost />
      <TwitterPost>
        <TwitterPost.Header
          name="mcpcn"
          handle="@mcpcn_registry"
          timestamp="now"
        />
        <TwitterPost.Text>
          Props for facts. Context for shared behavior. Children for everything
          else.
        </TwitterPost.Text>
        <TwitterPost.Metrics likes={256} replies={18} retweets={42} />
        <TwitterPost.Actions />
      </TwitterPost>
    </div>
  );
}
