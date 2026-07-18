"use client";

import {
  AmountInput,
  AmountInputActions,
  AmountInputControls,
  AmountInputDisplay,
  AmountInputPresets,
} from "@/registry/payment/amount-input";

export default function AmountInputDemo() {
  return (
    <AmountInput>
      <AmountInputDisplay />
      <AmountInputControls>
        <AmountInputPresets />
        <AmountInputActions />
      </AmountInputControls>
    </AmountInput>
  );
}
