"use client";

import { TagSelect } from "@/registry/selection/tag-select";

export default function TagSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TagSelect />
      <TagSelect>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <TagSelect.Content />
        </div>
      </TagSelect>
    </div>
  );
}
