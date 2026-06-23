"use client";

import { ProductList } from "@/registry/list/product-list";

export default function ProductListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProductList />
      <ProductList>
        <ProductList.Header>
          <div>
            <p className="font-semibold">Custom Product List</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </ProductList.Header>
        <ProductList.FilterBar>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </ProductList.FilterBar>
      </ProductList>
    </div>
  );
}
