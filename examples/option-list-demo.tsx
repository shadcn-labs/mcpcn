"use client";

import { OptionList } from "@/registry/selection/option-list";

export default function OptionListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <OptionList />
      <OptionList>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <OptionList.Content />
        </div>
      </OptionList>
    </div>
  );
}
