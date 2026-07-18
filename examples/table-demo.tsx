"use client";

import {
  Table,
  TableContent,
  TableFooter,
  TableGrid,
  TableHeader,
} from "@/registry/list/table";

export default function TableDemo() {
  return (
    <Table>
      <TableContent>
        <TableHeader />
        <TableGrid />
        <TableFooter />
      </TableContent>
    </Table>
  );
}
