"use client";

import { ProductList } from "@/registry/list/product-list";

export default function ProductListDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProductList />
      <ProductList>
        <ProductList.FilterBar>
          <button className="rounded-full border px-3 py-1 text-sm">
            MCP-ready
          </button>
        </ProductList.FilterBar>
        <ProductList.SortDropdown>
          <option value="newest">Newest first</option>
        </ProductList.SortDropdown>
        <ProductList.ProductCard
          id="custom"
          name="Composable toolkit"
          price={129}
          rating={4.9}
        >
          <span className="text-xs text-muted-foreground">
            Includes custom actions
          </span>
        </ProductList.ProductCard>
      </ProductList>
    </div>
  );
}
