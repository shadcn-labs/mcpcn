"use client";

import { ArticlePreview } from "@/registry/blogging/article-preview";

export default function BloggingIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ArticlePreview />
    </div>
  );
}
