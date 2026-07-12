"use client";

import { ProgressSteps } from "@/registry/status/progress-steps";

export default function ProgressStepsDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProgressSteps />
      <ProgressSteps>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <ProgressSteps.Content />
        </div>
      </ProgressSteps>
    </div>
  );
}
