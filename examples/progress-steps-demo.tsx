"use client";

import {
  ProgressSteps,
  ProgressStepsList,
} from "@/registry/status/progress-steps";

export default function ProgressStepsDemo() {
  return (
    <ProgressSteps>
      <ProgressStepsList />
    </ProgressSteps>
  );
}
