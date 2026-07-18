"use client";

import {
  OptionList,
  OptionListActions,
  OptionListContent,
  OptionListOptions,
} from "@/registry/selection/option-list";

export default function OptionListDemo() {
  return (
    <OptionList>
      <OptionListContent>
        <OptionListOptions />
        <OptionListActions />
      </OptionListContent>
    </OptionList>
  );
}
