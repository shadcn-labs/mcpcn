"use client";

import { LinkedInPost } from "@/registry/social/linkedin-post";

export default function LinkedInPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <LinkedInPost />
      <LinkedInPost>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <LinkedInPost.Content />
        </div>
      </LinkedInPost>
    </div>
  );
}
