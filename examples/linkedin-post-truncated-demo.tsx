"use client";

import { LinkedInPost } from "@/registry/social/linkedin-post";

export default function LinkedInPostTruncatedDemo() {
  return (
    <LinkedInPost
      appearance={{ maxLines: 3 }}
      data={{
        author: "mcpcn",
        avatar: "M",
        comments: "890",
        content:
          "Excited to announce our latest milestone!\n\nWe've just crossed 10,000 developers using mcpcn to build agentic UIs. Thank you to everyone who believed in our vision.\n\nWhat's next? We're working on something big. Stay tuned!\n\n#AI #AgenticUI #Developer #OpenSource",
        headline: "mcpcn | Open Source",
        reactions: "15K",
        reposts: "2.1K",
        time: "2h",
        topReactions: ["like", "insightful", "celebrate"],
      }}
    />
  );
}
