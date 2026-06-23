"use client";

import { ArticlePreview } from "@/registry/blogging/article-preview";

export default function ArticlePreviewDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ArticlePreview />
      <ArticlePreview>
        <ArticlePreview.Header>
          <div>
            <p className="font-semibold">Custom Article Preview</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </ArticlePreview.Header>
        <ArticlePreview.Excerpt>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </ArticlePreview.Excerpt>
      </ArticlePreview>
    </div>
  );
}
