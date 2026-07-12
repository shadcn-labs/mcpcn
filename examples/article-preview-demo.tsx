"use client";

import { ArticlePreview } from "@/registry/blogging/article-preview";

export default function ArticlePreviewDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ArticlePreview />
      <ArticlePreview>
        <ArticlePreview.Header
          title="Why children are the best escape hatch"
          author="mcpcn team"
          date="Today"
        />
        <ArticlePreview.Excerpt>
          A component API stays useful longer when consumers can supply ordinary
          JSX.
        </ArticlePreview.Excerpt>
        <ArticlePreview.Tags tags={["API design", "React"]} />
        <ArticlePreview.CTA>Open article</ArticlePreview.CTA>
      </ArticlePreview>
    </div>
  );
}
