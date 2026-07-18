"use client";

import { LinkedInPost } from "@/registry/social/linkedin-post";

export default function LinkedInPostMediaDemo() {
  return (
    <LinkedInPost
      data={{
        author: "mcpcn",
        avatar: "M",
        comments: "124",
        content:
          "Excited to announce our latest milestone! We've just crossed 10,000 developers using mcpcn to build agentic UIs.",
        headline: "mcpcn | Open Source",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        reactions: "2,847",
        reposts: "89",
        time: "2h",
        topReactions: ["like", "celebrate", "insightful"],
      }}
    />
  );
}
