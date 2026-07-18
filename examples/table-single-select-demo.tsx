"use client";

import {
  Table,
  TableContent,
  TableFooter,
  TableGrid,
  TableHeader,
} from "@/registry/list/table";

export default function TableSingleSelectDemo() {
  return (
    <Table appearance={{ selectable: "single" }}>
      <TableContent>
        <TableHeader />
        <TableGrid />
        <TableFooter />
      </TableContent>
    </Table>
  );
}
