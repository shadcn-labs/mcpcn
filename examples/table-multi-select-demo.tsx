"use client";

import {
  Table,
  TableContent,
  TableFooter,
  TableGrid,
  TableHeader,
} from "@/registry/list/table";

export default function TableMultiSelectDemo() {
  return (
    <Table appearance={{ selectable: "multi" }}>
      <TableContent>
        <TableHeader />
        <TableGrid />
        <TableFooter />
      </TableContent>
    </Table>
  );
}
