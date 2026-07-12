"use client";

import { IssueReportForm } from "@/registry/form/issue-report-form";

export default function IssueReportFormDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <IssueReportForm />
      <IssueReportForm>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <IssueReportForm.Content />
        </div>
      </IssueReportForm>
    </div>
  );
}
