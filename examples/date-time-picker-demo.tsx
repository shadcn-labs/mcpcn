"use client";

import { DateTimePicker } from "@/registry/form/date-time-picker";

export default function DateTimePickerDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DateTimePicker />
      <DateTimePicker>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <DateTimePicker.Content />
        </div>
      </DateTimePicker>
    </div>
  );
}
