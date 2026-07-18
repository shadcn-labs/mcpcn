"use client";

import {
  LinkedInPost,
  LinkedInPostBody,
  LinkedInPostContent,
  LinkedInPostEngagement,
  LinkedInPostFooter,
  LinkedInPostHeader,
  LinkedInPostMain,
} from "@/registry/social/linkedin-post";

export default function LinkedInPostDemo() {
  return (
    <LinkedInPost>
      <LinkedInPostContent>
        <LinkedInPostMain>
          <LinkedInPostHeader />
          <LinkedInPostBody />
        </LinkedInPostMain>
        <LinkedInPostEngagement />
        <LinkedInPostFooter />
      </LinkedInPostContent>
    </LinkedInPost>
  );
}
