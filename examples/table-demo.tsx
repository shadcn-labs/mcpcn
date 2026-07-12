"use client";

import { Table } from "@/registry/list/table";

export default function TableDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Table />
      <Table>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <Table.Content />
        </div>
      </Table>
    </div>
  );
}
