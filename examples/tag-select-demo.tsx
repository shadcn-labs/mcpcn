"use client";

import {
  TagSelect,
  TagSelectActions,
  TagSelectContent,
  TagSelectTags,
} from "@/registry/selection/tag-select";

export default function TagSelectDemo() {
  return (
    <TagSelect>
      <TagSelectContent>
        <TagSelectTags />
        <TagSelectActions />
      </TagSelectContent>
    </TagSelect>
  );
}
