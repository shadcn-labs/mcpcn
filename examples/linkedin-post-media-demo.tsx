"use client";

import {
  LinkedInPost,
  LinkedInPostBody,
  LinkedInPostContent,
  LinkedInPostEngagement,
  LinkedInPostFooter,
  LinkedInPostHeader,
  LinkedInPostMain,
  LinkedInPostMedia,
} from "@/registry/social/linkedin-post";

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
        image: "https://picsum.photos/seed/linkedin-post/800/450",
        reactions: "2,847",
        reposts: "89",
        time: "2h",
        topReactions: ["like", "celebrate", "insightful"],
      }}
    >
      <LinkedInPostContent>
        <LinkedInPostMain>
          <LinkedInPostHeader />
          <LinkedInPostBody />
        </LinkedInPostMain>
        <LinkedInPostMedia />
        <LinkedInPostEngagement />
        <LinkedInPostFooter />
      </LinkedInPostContent>
    </LinkedInPost>
  );
}
